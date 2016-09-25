import React, { Component } from 'react';
import { Brands } from '../../api/brands.js';
import { Products } from '../../api/products.js';
import { Meteor } from 'meteor/meteor';

class ProductsList extends Component {

	componentDidMount() {
		$('.money-mask').mask("#.##0,00", {reverse: true});
	}

	getBrandName(brandId) {
		brand = Brands.findOne({'_id': brandId});
		if(typeof brand !== 'undefined')
			return brand.name;
		else
			return 'Sem marca';
	}

	removeProduct(productId) {
		Products.remove({'_id': productId});
	}

	render() {
		
		let products = this.props.products;
		let verified = Meteor.user().verified;
		
		if(products.length > 0) {
			return(
				<ons-list modifier='inset' class='product-list'>
					{products.map((product) => (
						<ons-list-item class="product" key={product._id}>
							<div className="image">
								<img src={(typeof product.images != 'undefined')?product.images[0]:'/img/placeholder.png'} />
							</div>
							<div className="data">
								{console.log(product)}
								<span className="name">{product.name} ({this.getBrandName(product.brand_id)})</span>

								{verified?(<span className="price">R$ <span className="money-mask">{product.price}</span></span>):''}
								
							</div>
							<div className="details">
								<a href={'/product/'+product._id}><ons-button modifier="quiet">Ver tamanhos e cores</ons-button></a>
								<ons-button style={{'color': '#f00'}} onClick={this.removeProduct.bind(this, product._id)} modifier="quiet">Apagar</ons-button>
							</div>
						</ons-list-item>	
					))}
				</ons-list>
			);
		} else {
			return(
				<p><i>Nenhum produto encontrado. <a href="/search">Clique aqui</a> para fazer uma busca.</i></p>
			);
		}
	}
}

export default ProductsList;