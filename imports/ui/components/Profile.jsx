import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import { Meteor } from 'meteor/meteor';

class Profile extends Component {

	handleSubmit(event) {

		// Prevents the default event behavior
		// in order to proccess the form
		event.preventDefault();

		// Sets the query object with the ref values
		let query = Helpers.getRefValues(this.refs);
		
		// Change the User Email
		let newEmail = query.email;
		Meteor.call('changeUserEmail', newEmail, function(e,r) {
			if(e) console.log(e);
			else console.log(r);
		});
		
		// Change the user profile
		let profile = this.props.currentUser.profile;
		profile = Helpers.push(profile,query);

		Meteor.users.update({_id: this.props.currentUser._id}, {$set: {profile: profile}}, function(e,r){
			if(e) console.log(e);
			else console.log(r);
		});
	}

	render() {
	
		// Renaming props in a less verbose way
		let {name, phone} = this.props.currentUser.profile;
		let email = this.props.currentUser.emails[0].address;
		
		return(
			<div className='profile' >

					<ons-list modifier='inset'>

						<ons-list-header>Perfil</ons-list-header>	

						<ons-list-item>
							<input type='text' placeholder='Nome' ref='name' defaultValue={name} />
						</ons-list-item>

						<ons-list-item>
							<input type='text' placeholder='Telefone' ref='phone' defaultValue={phone} />
						</ons-list-item>
						
						<ons-list-item>
							<input type='text' placeholder='Email' ref='email' defaultValue={email} />
						</ons-list-item>

					</ons-list>
					<ons-button onClick={this.handleSubmit.bind(this)} style={{display: 'block',margin: '50px 8px 15px 8px',textAlign: 'center',fontWeight: 'bold'}} type='submit'>Salvar Perfil</ons-button>
			</div>
		);

	}
}

export default Profile;