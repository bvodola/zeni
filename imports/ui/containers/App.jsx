import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import App from '../App.jsx';

function composer(props, onData) {

	const handle = Meteor.subscribe('users');

	if(handle.ready()) {
		const currentUser = Meteor.user()
		onData(null, {currentUser});
	}
}

export default composeWithTracker(composer)(App);