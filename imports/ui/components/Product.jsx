import React, { Component } from 'react';
import { Dialog, Button, Carousel, CarouselItem } from 'react-onsenui';
import { Brands } from '../../api/brands.js';

class Product extends Component {
	
	// ===========
	// Constructor
	// ===========
	constructor(props) {
		super(props);

		this.state = {
			showFlashMessage: false
		}

		// CSS Styles
		this.style = {
			header: {
				fontSize: '20px'
			},
			carousel: {
				padding: 0
			},

			addButton: {
				display: 'block',
				margin: '15px 8px',
			    textAlign: 'center',
			    lineHeight: '35px'
			},
			addButtonIcon: {
				lineHeight: '6px',
    			marginRight: 10
			},
			variationList: {
				marginTop: 30
			}
		}
	}

	// =================
	// componentDidMount
	// =================
	componentDidMount() {

		$('.money-mask').mask("#.##0,00", {reverse: true});
	}
	
	// ============
	// handleSubmit
	// ============

	handleSubmit() {

		// Create the queryProduct (product to be added to the cart)
		let currentProduct = this.props.product;
		let queryProduct = new Object();

		// Populate the queryProduct
		queryProduct._id = currentProduct._id;
		queryProduct.name = currentProduct.name;
		queryProduct.image = (typeof currentProduct.images != 'undefined'?currentProduct.images[0]:undefined);
		queryProduct.price = currentProduct.price;
		queryProduct.variations = new Array();
		
		// Populating the queryProduct.variations array
		for(let i=0; i<currentProduct.variations.length; i++) {
			if(this.refs['variation'+i].value > 0) {
				queryProduct.variations.push({
					_id: currentProduct.variations[i]._id,
					size: currentProduct.variations[i].size,
					color: currentProduct.variations[i].color,
					quantity: parseInt(this.refs['variation'+i].value)
				});
			}
		}
		
		// Adds the product to the cart
		if(queryProduct.variations.length>0) {
			Meteor.call('addToCart', queryProduct);
			clearFields();
			this.setState({showFlashMessage: true});
		}

	}

	closeDialog() {
		this.setState({showFlashMessage: false});
	}

	getBrandName(brandId) {
		brand = Brands.findOne({'_id': brandId});
		if(typeof brand !== 'undefined')
			return brand.name;
		else
			return 'Sem marca';
	}

	renderImages() {
		let product = this.props.product;
		
		if(typeof product.images != 'undefined') {
			return(
				<Carousel ref="carousel" swipeable overscrollable style={{'height': '300px'}}>
				{product.images.map((image, i) => (
					<CarouselItem key={i} style={{'position': 'absolute'}}>
						<div key={image.split('/').splice(-1)}>
							<img src={image} style={{maxWidth: '100%', height: 'auto'}} />
						</div>
					</CarouselItem>
				))}
				</Carousel>
			);
		}
		else {
			return(
				<div><img src="/img/placeholder.png" alt="" style={{maxWidth: '100%', height: 'auto'}}/></div>
			);
		}
	}

	renderFlashMessage() {
		if(this.state.showFlashMessage == true) {
			return(
				<Dialog isOpen={this.state.showFlashMessage}>
					<p>Produto Adicionado ao carrinho</p>
					<a href="/cart">
	          			<Button>
	          				Ver carrinho
	          			</Button>
          			</a>
				</Dialog>
			);
		}
	}

	render() {
		
		// Define the product prop in a less verbose way
		let product = this.props.product;

		// Check if the user is verified
		let verified = Meteor.user().verified;

		return(
			<div className="product">
				{this.renderFlashMessage()}
				<h1 style={this.style.header} >{product.name}</h1>
				<div>
					{verified?(<p className='price'>R$<span className="money-mask">{product.price}</span></p>):''}
					<p>{this.getBrandName(product.brand_id)}</p>
				</div>	
				
				<ons-list modifier='inset'>
					<ons-list-item style={this.style.carousel}>
						{this.renderImages()}
					</ons-list-item>
				</ons-list>

				<ons-list modifier='inset' style={this.style.variationList}>
					<ons-list-header>
						<ons-row>
							<ons-col width="35%">Cor</ons-col>
							<ons-col>Tamanho</ons-col>
							{verified?(<ons-col>Quant.</ons-col>):''}
						</ons-row>
					</ons-list-header>
					{product.variations.map((variation, i)=> (
						<ons-list-item key={i}>
							<ons-row>
								<ons-col width="35%">{variation.color}</ons-col>
								<ons-col>{variation.size}</ons-col>
								{verified?(<ons-col><input type="number" ref={'variation'+i} className='text-input framed-input' /></ons-col>):''}
							</ons-row>
						</ons-list-item>
					))}
				</ons-list>
				
				{verified?(
				<ons-button style={this.style.addButton} class="button" onClick={this.handleSubmit.bind(this)}>
					<ons-icon style={this.style.addButtonIcon} icon="ion-plus-circled"></ons-icon>
					Adicionar ao Carrinho
				</ons-button>
				):''}

			</div>
		);
	}
}

export default Product;