import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user) {
	
	// Sets the user verification to false as a default behavior
	// The ADMIN must verify the user manually
	user.admin = false;
	user.verified = false;

	// Sets the profile object
	user['profile'] = {};

	// Sets the profile object properties
	user.profile['name'] = '';
	user.profile['phone'] = '';
	user.profile['notifications'] = '';

	return user;
});