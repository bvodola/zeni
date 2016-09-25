import React, { Component } from 'react';
import { Sizes } from '../../../api/sizes.js';
import { CategoriesSelect } from '../partials/Partials.jsx';

class AdminSizesList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selected_category_id: ''
		}
	}

	handleSubmit() {

		let query = {
			name: this.refs.name.value,
			category_id: this.refs.category_id.refs.category_id.value,
		};

		Sizes.insert(query);
		clearFields('#addSizeForm');
	}

	handleChangeCategory(event) {
		this.setState({
			selected_category_id: event.target.value
		});
	}

	removeSize(id) {
		Sizes.remove({_id: id});
	}

	renderListItem(size) {
		console.log(this.state.selected_category_id,size.category_id);

		if(this.state.selected_category_id == size.category_id) {
			console.log('list!');
			return(
				<ons-list-item key={size._id}>
				
					<div className="center">
						{size.name}
					</div>
					<div className="right">
				    	<a href="#" onClick={this.removeSize.bind(this, size._id)}>Apagar</a>
					</div>
				</ons-list-item>
			);
		}
	}

	renderList() {

		if(this.state.selected_category_id == '') {
			return(
				<p>Selecione uma categoria para exibir os tamanhos correspondentes.</p>
			);
		} else {
			if(this.props.sizes.length > 0) {
				console.log(this.props.sizes);
				return(
					<ons-list>
						<ons-list-header>Tamanhos</ons-list-header>
						{this.props.sizes.map((size) => this.renderListItem(size))}
					</ons-list>
				);
			}
			else {
				return(
					<p>Nenhum tamanho cadastrado.</p>
				);
			}
		}
	}

	render() {

		return(
			<div>
				<CategoriesSelect onChange={this.handleChangeCategory.bind(this)} categories={this.props.categories} />
				{this.renderList()}
				<br />
				<h3>Novo Tamanho</h3>
				<form id='addSizeForm' onSubmit={(event) => (event.preventDefault())}>
					<CategoriesSelect ref='category_id' categories={this.props.categories} />
					<ons-input ref='name' type='text' placeholder='Tamanho' />
					<ons-button modifier='large' onClick={this.handleSubmit.bind(this)}>Cadastrar</ons-button>
				</form>
			</div>
		);
	}
}

export default AdminSizesList;