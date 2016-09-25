import { Meteor } from 'meteor/meteor';
import { Categories } from '../imports/api/categories.js';
import { Brands } from '../imports/api/brands.js';
import { Products } from '../imports/api/products.js';
import { Carts } from '../imports/api/carts.js';
import { Orders } from '../imports/api/orders.js';

// ==============
// Meteor Methods
// ==============

Meteor.methods({
	
	// getCategoryName()
	// Returns the name of a category
	// based on its _id
	'getCategoryName': function(categoryId) {
		let category = Categories.findOne(categoryId);
		return category.name;
	},
	
	// getBrandName()
	// Returns the name of a brand
	// based on its _id
	'getBrandName': function(brandId) {
		let brand = Brands.findOne(brandId);
		return brand.name;
	},

	// getProductName()
	'getProductName': function(productId) {
		let product = Products.findOne(productId);
		return product.name;
	},
	
	// getUserCart()
	// Returns the Cart for the logged user
	'getUserCart': function() {

		// Checks if the user is defined
		if(typeof(Meteor.user()) != 'undefined') {
			let cart = Carts.findOne({user_id: Meteor.userId()});
			console.log(cart);

			// If the user doesn't have a cart defined on the database, let's define it
			if(typeof(cart) == 'undefined') {
				Carts.insert({user_id: Meteor.userId(), products: new Array(), total: 0});
				cart = Carts.findOne({user_id: Meteor.userId()});
			}

			return cart;
		}

		// If no user is logged, returns undefined
		else
			return 'User not logged';
	},

	// addToCart()
	// Add a product to the Cart database
	'addToCart': function(product) {
		
		// First, gets the user cart
		Meteor.call('getUserCart', function(err,res) {
			
			// Define the cart object as the response of the getUserCart() method
			// Maybe this callback style could be changed to a sync Method call.
			let cart = res;

			// Checks if the user has a cart defined with a products array
			if(typeof(cart) != 'undefined' && Array.isArray(cart.products)) {

				let cartHasProduct = false;
			
				// Check the cart to see if this product was previously added
				for(let i=0; i<cart.products.length; i++) {

					// If the product was previously added
					if(cart.products[i]._id == product._id) {
						
						cartHasProduct = true;

						// Checks if the variations of the current product were previoulsy added
						for(let k=0; k<product.variations.length; k++) {

							let variationAdded = false;

							for(let j=0; j<cart.products[i].variations.length; j++) {

								// If the variation being added is the same as the one already on the cart, sums up the quantities
								if(cart.products[i].variations[j]._id == product.variations[k]._id) {
									cart.products[i].variations[j].quantity = parseInt(cart.products[i].variations[j].quantity)+parseInt(product.variations[k].quantity);
									variationAdded = true;
								}
							}

							// If the variation was not previously present, add it to the cart product variations array
							if(!variationAdded)
								cart.products[i].variations.push(product.variations[k]);

						}
					}
				}
				
				// If the product was not previously present, add it to the cart products array
				if(!cartHasProduct)
					cart.products.push(product);

				// Finally, update the cart in the database
				Carts.update(cart._id,{$set: {products: cart.products}});
				Carts.update(cart._id,{$set: {total: getCartTotal()}});
			}
		});
	},

	// removeProductFromCart()
	'removeProductFromCart': function(productId) {
		if(typeof(Meteor.user() != 'undefined')) {
			let cart = Meteor.call('getUserCart');
			for(let i=0; i<cart.products.length; i++) {
				if(cart.products[i]._id == productId) {
					cart.products.splice(i,1);

					// Update the cart in the database
					Carts.update(cart._id,{$set: {products: cart.products}});
					Carts.update(cart._id,{$set: {total: getCartTotal()}});
				}
			}
		}
	},

	// removeProductFromCart()
	'removeVariationFromCart': function(productId, variationId) {
		if(typeof(Meteor.user() != 'undefined')) {
			let cart = Meteor.call('getUserCart');
			for(let i=0; i<cart.products.length; i++) {
				if(cart.products[i]._id == productId) {
					
					for(let j=0; j<cart.products[i].variations.length; j++) {
						if(cart.products[i].variations[j]._id == variationId) {
							cart.products[i].variations.splice(j,1);
							
							if(cart.products[i].variations.length<1) {
								Meteor.call('removeProductFromCart', productId);
							} else {
								// Update the cart in the database
								Carts.update(cart._id,{$set: {products: cart.products}});
								Carts.update(cart._id,{$set: {total: getCartTotal()}});
							}
						}
					}
				}
			}
		}
	},
	
	// changeVariationQuantity()
	'changeVariationQuantity': function(productId,variationId, newQuantity) {
		if(newQuantity < 1) {
			Meteor.call('removeVariationFromCart', productId,variationId);
		}

		else {
			if(typeof(Meteor.user() != 'undefined')) {
				let cart = Meteor.call('getUserCart');
				for(let i=0; i<cart.products.length; i++) {
					if(cart.products[i]._id == productId) {
						for(let j=0; j<cart.products[i].variations.length; j++) {
							if(cart.products[i].variations[j]._id == variationId) {
								cart.products[i].variations[j].quantity = newQuantity;
								// Update the cart in the database
								Carts.update(cart._id,{$set: {products: cart.products}});
								Carts.update(cart._id,{$set: {total: getCartTotal()}});
							}
						}
					}
				}
			}
		}
	},

	// registerOrder()
	'registerOrder': function() {
		if(typeof(Meteor.user()) != 'undefined') {
			let cart = Meteor.call('getUserCart');
			if(cart.products.length > 0) {
				let cartId = cart._id;
				delete(cart._id);
				cart.created = new Date();
				
				Orders.insert(cart);
				Carts.remove({_id: cartId});
			}
		}
	},

	// changeUserEmail()
	// This function assumes that the user has only one email registered
	'changeUserEmail': function(newEmail) {
		if(typeof(Meteor.user()) != 'undefined') {
			let emails = [{ address: newEmail, verified: Meteor.user().emails[0].verified }];
			return Meteor.users.update({_id: Meteor.user()._id}, {$set: {emails: emails}});
		}
	},

	'toggleUserVerified': function(userId) {
		let user = Meteor.users.findOne({'_id': userId});
		if(typeof user !== 'undefined')
			return Meteor.users.update({_id: userId}, {$set: {verified: !user.verified}});
		else
			return false
	}

});


function getCartTotal() {
	// Checks if the user is defined
	if(typeof(Meteor.user()) != 'undefined') {
		let cart = Carts.findOne({user_id: Meteor.userId()});
		console.log(cart);

		// If the user doesn't have a cart defined on the database, returns 0
		if(typeof(cart) == 'undefined') {
			return 0;
		}
		
		// If the user has a cart defined, let's calculate it's total
		else {
			let total = 0;
			cart.products.forEach(function(product,i,products) {
				product.variations.forEach(function(variation,j,variations) {
					total += product.price*variation.quantity
				});
			});

			return total;
		}
	}

	// If no user is logged, returns undefined
	else
		return 'User not logged';
}