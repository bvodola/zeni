import React, {Component} from 'react';

class OrdersList extends Component {

	componentDidMount() {
		$('.money-mask').mask("#.##0,00", {reverse: true});
	}

	render() {

		let orders = this.props.orders;

		return(
			<div>
				<ons-list modifier='inset'>
					<ons-list-header>
						<ons-row>
							<ons-col>Código</ons-col>
							<ons-col>Data</ons-col>
							<ons-col>Valor</ons-col>
						</ons-row>
					</ons-list-header>
					{orders.map((order) => (
						<ons-list-item key={order._id}>
							<ons-row>
								<ons-col>{order._id.substr(0,6).toUpperCase()}</ons-col>
								<ons-col>{order.created.toLocaleDateString()}</ons-col>
								<ons-col>R$ <span className="money-mask">{order.total}</span></ons-col>
							</ons-row>
						</ons-list-item>
					))}
				</ons-list>
			</div>
		);
	}
}

export default OrdersList;