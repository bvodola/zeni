import React, { Component } from 'react';
import CartProduct from './CartProduct.jsx';

class Cart extends Component {
	
	constructor(props) {
		super(props);
		
		this.style = {
			registerOrderButton: {
    			textAlign: 'center',
    			display: 'block',
    			margin: '0 8px'
			}
		}
	}

	componentDidMount() {
		$('.money-mask').mask("#.##0,00", {reverse: true});
	}
	
	registerOrder() {
		Meteor.call('registerOrder', function(err,res) {
			// Show Flash Message here
		});
	}

	render() {
		
		let cart = this.props.cart;

		if(cart != null && cart.products.length > 0) {
			return(
				<div>
				{cart.products.map((product)=>(
					<CartProduct key={product._id} product={product} />
				))}
				<ons-button style={this.style.registerOrderButton} onClick={this.registerOrder.bind(this)}>
					Registrar Pedido
				</ons-button>
			</div>
			);
		} else {
			return(
				<p style={{textAlign: 'center'}} >
					Seu carrinho está vazio. <br/>
					<a href="/orders">Ver meus pedidos</a>
				</p>
			);
		}
	}
}

export default Cart;