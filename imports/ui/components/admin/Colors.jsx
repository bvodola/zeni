import React, { Component } from 'react';
import { Colors } from '../../../api/colors.js';

class AdminColorsList extends Component {

	handleSubmit() {
		const query = setQuery();
		Colors.insert({name: query.name});
		clearFields();
	}

	removeColor(id) {
		Colors.remove({_id: id});
	}

	renderList() {
		console.log(this.props.colors);
		if(this.props.colors.length > 0) {
			return(
				<ons-list>
					<ons-list-header>Cores</ons-list-header>
					{this.props.colors.map((color) => (
						<ons-list-item key={color._id}>
							<div className="center">
								{color.name}
							</div>
							<div className="right">
						    	<a href="#" onClick={this.removeColor.bind(this, color._id)}>Apagar</a>
							</div>
						</ons-list-item>
					))}
				</ons-list>
			);
		}
		else {
			return(
				<p>Nenhuma cor cadastrada.</p>
			);
		}
	}

	render() {

		return(
			<div>
				{this.renderList()}
				<br />
				<h3>Nova Cor</h3>
				<form onSubmit={(event) => (event.preventDefault())}>
					<ons-input name='name' type='text' placeholder='Nome da Cor' />
					<ons-button modifier='large' onClick={this.handleSubmit.bind(this)}>Cadastrar</ons-button>
				</form>
			</div>
		);
	}
}

export default AdminColorsList;