import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Cart from '../components/Cart.jsx';
import { Carts } from '../../api/carts.js';

function composer(props, onData) {

	const handle = Meteor.subscribe('carts');

	if(handle.ready()) {
		const cart = Carts.findOne({user_id: Meteor.userId()});
		onData(null, {cart});
	}
}

export default composeWithTracker(composer)(Cart);