import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Product from '../components/Product.jsx';
import { Products } from '../../api/products.js';

function composer(props, onData) {

	const handle = Meteor.subscribe('products');

	if(handle.ready()) {
		const product = Products.findOne(props.product_id);
		onData(null, {product});
	}
}

export default composeWithTracker(composer)(Product);