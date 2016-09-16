import React, { Component } from 'react';
import { Brands } from '../../../api/brands.js';

class AdminBrandsList extends Component {

	handleSubmit() {
		const query = setQuery();
		Brands.insert({name: query.name});
		clearFields();
	}

	removeBrand(id) {
		Brands.remove({_id: id});
	}

	renderList() {
		console.log(this.props.brands);
		if(this.props.brands.length > 0) {
			return(
				<ons-list>
					<ons-list-header>Marcas</ons-list-header>
					{this.props.brands.map((brand) => (
						<ons-list-item key={brand._id}>
							<div className="center">
								{brand.name}
							</div>
							<div className="right">
						    	<a href="#" onClick={this.removeBrand.bind(this, brand._id)}>Apagar</a>
							</div>
						</ons-list-item>
					))}
				</ons-list>
			);
		}
		else {
			return(
				<p>Nenhuma marca cadastrada.</p>
			);
		}
	}

	render() {

		return(
			<div>
				{this.renderList()}
				<br />
				<h3>Nova Marca</h3>
				<form onSubmit={(event) => (event.preventDefault())}>
					<ons-input name='name' type='text' placeholder='Nome da Marca' />
					<ons-button modifier='large' onClick={this.handleSubmit.bind(this)}>Cadastrar</ons-button>
				</form>
			</div>
		);
	}
}

export default AdminBrandsList;