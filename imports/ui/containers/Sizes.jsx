import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import AdminSizesList  from '../components/admin/Sizes.jsx';

import { Sizes } from '../../api/sizes.js';
import { Categories } from '../../api/categories.js';

function composer(props, onData) {

	const sizesHandle = Meteor.subscribe('sizes');
	const categoriesHandle = Meteor.subscribe('categories');

	if(sizesHandle.ready() && categoriesHandle.ready()) {
		const sizes = Sizes.find({},{sort: {name: 1}}).fetch();
		const categories = Categories.find({},{sort: {name: 1}}).fetch();

		onData(null, {sizes, categories});
	}
}

export const AdminSizesListComponent = composeWithTracker(composer)(AdminSizesList);