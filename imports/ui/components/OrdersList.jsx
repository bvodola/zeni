import React, {Component} from 'react';

const OrdersList = ({orders}) => (
	<div>
		{orders.map((order) => (
			<ons-list key={order._id}>
				{order._id}
			</ons-list>
		))}
	</div>
);

export default OrdersList;