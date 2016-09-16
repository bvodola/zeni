import React, { Component } from 'react';
import { Categories } from '../../../api/categories.js';

class AdminCategoriesList extends Component {

	handleSubmit() {
		const query = setQuery();
		Categories.insert({name: query.name});
		clearFields();
	}

	removeCategory(id) {
		Categories.remove({_id: id});
	}

	renderList() {
		console.log(this.props.categories);
		if(this.props.categories.length > 0) {
			return(
				<ons-list>
					<ons-list-header>Departamentos</ons-list-header>
					{this.props.categories.map((category) => (
						<ons-list-item key={category._id}>
							<div className="center">
								{category.name}
							</div>
							<div className="right">
						    	<a href="#" onClick={this.removeCategory.bind(this, category._id)}>Apagar</a>
							</div>
						</ons-list-item>
					))}
				</ons-list>
			);
		}
		else {
			return(
				<p>Nenhum departamento cadastrado.</p>
			);
		}
	}

	render() {

		return(
			<div>
				{this.renderList()}
				<br />
				<h3>Novo Departamento</h3>
				<form onSubmit={(event) => (event.preventDefault())}>
					<ons-input name='name' type='text' placeholder='Nome do Departamento' />
					<ons-button modifier='large' onClick={this.handleSubmit.bind(this)}>Cadastrar</ons-button>
				</form>
			</div>
		);
	}
}

export default AdminCategoriesList;