import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import AdminColorsList  from '../components/admin/Colors.jsx';
// import CategoriesList  from '../components/CategoriesList.jsx';
import { Colors } from '../../api/colors.js';

function composer(props, onData) {

	const handle = Meteor.subscribe('colors');

	if(handle.ready()) {
		const colors = Colors.find({},{sort: {name: 1}}).fetch();
		onData(null, {colors});
	}
}

export const AdminColorsListComponent = composeWithTracker(composer)(AdminColorsList);
// export const CategoriesListComponent = composeWithTracker(composer)(CategoriesList);