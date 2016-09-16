import React, { Component } from 'react';
import { Brands } from '../../api/brands.js';
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

	render() {
		
		let products = this.props.products;
		let verified = Meteor.user().verified;
		
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
						</div>
					</ons-list-item>	
				))}
			</ons-list>
		);
	}
}

export default ProductsList;