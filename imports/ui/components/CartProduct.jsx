import React, { Component } from 'react';

export default class CartProduct extends Component {
	
	constructor(props) {
		super(props);
		this.style = {
			onsList: {
				marginBottom: 30,
				fontSize: '13px'
			},

			header: {	
				padding: 5,
					background: '#fff'
			},

			headerFields: {
				fontSize: '13px',
				fontWeight: 'bold'
			},

			name: {
				"fontSize": "15px",
				"margin": 0,
				"lineHeight": "20px",
				"textTransform": "none"
			},

			price: {
				margin: 0,
				color: '#7cb342'
			},

			image: {
				width: 70,
				borderRadius: '5px'
			},

			quantityInput: {
				height: 15,
				fontSize: '13px',
			    padding: '10px 0 10px 0px',
			    marginTop: '-3px',
			    width: '90%'
			},
			removeButton: {
				display: 'block',
				margin: '0px 8px',
			    textAlign: 'center',
		        lineHeight: '25px',
			    width: '100%',
			    fontSize: '14px',
			    color: '#b71c1c',
			    borderColor: '#b71c1c'
			},
			removeButtonIcon: {
				lineHeight: '9px',
    			marginRight: 10,
    			fontSize: '19px'
			},

		}
	}

	removeVariation(variationId) {
		Meteor.call('removeVariationFromCart', this.props.product._id, variationId);
	}

	changeQuantity(variationId) {
		Meteor.call('changeVariationQuantity', this.props.product._id, variationId, this.refs[variationId].value, function(err,res){
			$('.money-mask').unmask().mask("#.##0,00", {reverse: true});
		});

	}

	removeProduct() {
		Meteor.call('removeProductFromCart', this.props.product._id);
	}

	render() {

		let product = this.props.product;
		return(
			<ons-list modifier='inset' key={product._id} style={this.style.onsList}>
				<a href={'/product/'+product._id}>
					<ons-list-header style={this.style.header}>
						<ons-row>
							<ons-col width='80px'>
								<img style={this.style.image} src={(typeof product.image != 'undefined'? product.image:'/img/placeholder.png')} alt={product.name} />
							</ons-col>
							<ons-col>
								<h1 style={this.style.name}>{product.name}</h1>
								<p style={this.style.price}>R$<span className='money-mask'>{product.price}</span>/unidade</p>
							</ons-col>
						</ons-row>
					</ons-list-header>
				</a>
				<ons-list-item style={this.style.headerFields}>
					<ons-row>
						<ons-col width='30%'>Cor</ons-col>
						<ons-col width='15%'>Tam.</ons-col>
						<ons-col width='20%'>Qnt.</ons-col>
						<ons-col>Preço</ons-col>
						<ons-col width='5%'>&nbsp;</ons-col>
					</ons-row>
				</ons-list-item>
				{product.variations.map((variation,i)=>(
					<ons-list-item key={variation._id}>
						<ons-row>
							<ons-col width='30%'>{variation.color}</ons-col>
							<ons-col width='15%'>{variation.size}</ons-col>
							<ons-col width='20%'><input style={this.style.quantityInput} className='text-input framed-input' ref={variation._id} onBlur={this.changeQuantity.bind(this, variation._id)} defaultValue={variation.quantity} type="number"/></ons-col>
							<ons-col>R$<span className='money-mask'>{variation.quantity*product.price}</span></ons-col>
							<ons-col width='5%'><a onClick={this.removeVariation.bind(this, variation._id)} href="">&times;</a></ons-col>
						</ons-row>
					</ons-list-item>
				))}
				<ons-list-item>
					<ons-button style={this.style.removeButton} modifier='outline' onClick={this.removeProduct.bind(this)}>
						<ons-icon style={this.style.removeButtonIcon} icon='ion-trash-a'></ons-icon>
						Excluir do Carrinho
					</ons-button>
				</ons-list-item>
			</ons-list>
		);
	}
}