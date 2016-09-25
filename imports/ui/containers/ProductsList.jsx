import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import ProductsList  from '../components/ProductsList.jsx';
import { Products } from '../../api/products.js';
import { Brands } from '../../api/brands.js';

function composer(props, onData) {

	const handle = Meteor.subscribe('products');
	const handle2 = Meteor.subscribe('brands');

	if(handle.ready() && handle2.ready()) {

		// First, we define the query object that will be used
		// to filter the list of products to be displayed
		let query = {};
		
		// ==================
		// Filter by Category
		// ==================
		if(typeof props.category_id != 'undefined' )
			query['category_id'] = props.category_id;
		
		// ==============
		// Search Filters
		// ==============
		else if(typeof props.search !== 'undefined' && props.search == true ) {
			
			console.log(props);

			// Defined the props in a less verbose way
			let {search, categories, brands, price1, price2, colors, sizes} = props;

			if(typeof categories !== 'undefined')	query['category_id'] = {$in: categories};
			if(typeof brands !== 'undefined')	query['brand_id'] = {$in: brands};


			if(typeof colors !== 'undefined')	query['variations.color'] = {$in: colors};
			if(typeof sizes !== 'undefined')	query['variations.size'] = {$in: sizes};

			if(typeof price1 !== 'undefined' || typeof price2 !== 'undefined') {

				// Only Maximium Price was set
				if(typeof price1 !== 'undefined') {
					query['price'] = {$lte: String(price2)};
				}

				// Only Minimum Price was set
				else if(typeof price2 !== 'undefined') {
					query['price'] = {$gte: String(price1)};
				}

				// Both minimum and maximuum price were set
				else {
					query['price'] = { $gte: String(price1), $lte: String(price2) };
				}
			}
			
			console.log(query);

		}

		const products = Products.find(query,{sort: {name: 1}}).fetch();
		onData(null, {products});
	}
}

export default composeWithTracker(composer)(ProductsList);