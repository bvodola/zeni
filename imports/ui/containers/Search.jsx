import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Search from '../components/Search.jsx';

import { Categories } from '../../api/categories.js';
import { Brands } from '../../api/brands.js';
import { Sizes } from '../../api/sizes.js';
import { Colors } from '../../api/colors.js';

function composer(props, onData) {

	const categoriesHandle = Meteor.subscribe('categories');
	const brandsHandle = Meteor.subscribe('brands');
	const sizesHandle = Meteor.subscribe('sizes');
	const colorsHandle = Meteor.subscribe('colors');

	if(categoriesHandle.ready() && brandsHandle.ready() && sizesHandle.ready() && colorsHandle.ready()) {
		const categories = Categories.find({},{sort: {name: 1}}).fetch();
		const brands = Brands.find({},{sort: {name: 1}}).fetch();
		const sizes = Sizes.find({},{sort: {name: 1}}).fetch();
		const colors = Colors.find({},{sort: {name: 1}}).fetch();
		onData(null, {categories, brands, sizes, colors});
	}
}

export default composeWithTracker(composer)(Search);