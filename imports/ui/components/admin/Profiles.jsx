import React, { Component } from 'react';
import {Switch} from 'react-onsenui';

// ==================
// Profiles List Item
// ==================
class ProfilesItem extends Component {

	constructor(props){
		super(props);

		this.state = {
			verified: Meteor.user().verified
		}
	}

	handleVerifiedChange() {
		let self = this;
		this.setState({ verified: !this.state.verified }, function() {
			Meteor.call('toggleUserVerified', this.props.user._id);
		});

	}

	render() {
		let user = this.props.user;
		return(
			<ons-list>
				<ons-list-item>{user.emails[0].address}</ons-list-item>
				<ons-list-item>{user.profile.name || 'Nome não preenchido'}</ons-list-item>
				<ons-list-item>{user.profile.phone || 'Telefone não preenchido'}</ons-list-item>
				<ons-list-item>
					<div className="left">Autorizar usuário</div>
					<div className="right">
						<Switch checked={Meteor.user().verified} onChange={this.handleVerifiedChange.bind(this)} />
					</div>
				</ons-list-item>
			</ons-list>
		);
	}
}
// =============
// Profiles List
// =============
class Profiles extends Component {

	renderList() {
		return this.props.users.map((user) => (
			<ProfilesItem user={user} key={user._id} />
		));
	}

	render() {
		
		let users = this.props.users;
		console.log(users);

		return(
			<div className="profiles">
				{this.renderList()}
			</div>
		);
	}
}

export default Profiles;