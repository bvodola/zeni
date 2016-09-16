import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import AddProduct  from '../components/AddProduct.jsx';
import { Categories } from '../../api/categories.js';
import { Brands } from '../../api/brands.js';

function composer(props, onData) {

	const handle = Meteor.subscribe('categories');

	if(handle.ready()) {
		const categories = Categories.find({},{sort: {name: 1}}).fetch();
		const brands = Brands.find({},{sort: {name: 1}}).fetch();
		onData(null, {categories, brands});
	}
}

export default composeWithTracker(composer)(AddProduct);