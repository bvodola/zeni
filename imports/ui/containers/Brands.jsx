import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import AdminBrandsList  from '../components/admin/Brands.jsx';
// import CategoriesList  from '../components/CategoriesList.jsx';
import { Brands } from '../../api/brands.js';

function composer(props, onData) {

	const handle = Meteor.subscribe('brands');

	if(handle.ready()) {
		const brands = Brands.find({},{sort: {name: 1}}).fetch();
		onData(null, {brands});
	}
}

export const AdminBrandsListComponent = composeWithTracker(composer)(AdminBrandsList);
// export const CategoriesListComponent = composeWithTracker(composer)(CategoriesList);