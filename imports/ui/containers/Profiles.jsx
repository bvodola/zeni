import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Profiles  from '../components/admin/Profiles.jsx';

function composer(props, onData) {

	const handle = Meteor.subscribe('users');

	if(handle.ready()) {
		const users = Meteor.users.find({},{sort: {created_at: 1}}).fetch();
		onData(null, {users});
	}
}

export default composeWithTracker(composer)(Profiles);