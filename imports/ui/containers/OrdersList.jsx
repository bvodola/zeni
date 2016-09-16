import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import OrdersList from '../components/OrdersList.jsx';
import { Orders } from '../../api/orders.js';

function composer(props, onData) {

	const handle = Meteor.subscribe('orders');

	if(handle.ready()) {
		const orders = Orders.find({user_id: Meteor.userId()}).fetch();
		onData(null, {orders});
	}
}

export default composeWithTracker(composer)(OrdersList);