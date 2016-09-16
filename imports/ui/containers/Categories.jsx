import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import AdminCategoriesList  from '../components/admin/Categories.jsx';
import CategoriesList  from '../components/CategoriesList.jsx';
import { Categories } from '../../api/categories.js';

function composer(props, onData) {

	const handle = Meteor.subscribe('categories');

	if(handle.ready()) {
		const categories = Categories.find({},{sort: {name: 1}}).fetch();
		onData(null, {categories});
	}
}

export const AdminCategoriesListComponent = composeWithTracker(composer)(AdminCategoriesList);
export const CategoriesListComponent = composeWithTracker(composer)(CategoriesList);