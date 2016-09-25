import React, { Component } from 'react';
import { DataSelect, DataOnsCheckboxes } from './partials/Partials.jsx';
import { Helpers } from '../helpers/Helpers.jsx'
import { Sizes } from '../../api/sizes.js';

class Search extends Component {
		
	constructor(props) {
		super(props);

		this.state = {
			categorySizes: [],
		};
	}

	handleCategoryChange(event) {
		let categorySizes = Sizes.find({'category_id': this.refs.category_id.state._id}).fetch();
		this.setState({categorySizes: categorySizes});
	}
	
	handleSubmit() {
		let query = Helpers.getRefValues(this.refs);
		query['categories'] = [query['category_id']];
		delete query['category_id'];

		console.log(query);
		FlowRouter.go("/results", {}, query);
	}

	render() {
		return(
			<div className="search">
				<ons-list modifier='inset'>
					<ons-list-header>
						Departamento
					</ons-list-header>
					<ons-list-item>
						<DataSelect ref='category_id' onChange={this.handleCategoryChange.bind(this)} data={this.props.categories} placeholder='Departamento' dataState='_id' />
					</ons-list-item>
				</ons-list>

				<DataOnsCheckboxes ref='brands' title='Marcas' data={this.props.brands} dataState />
				<DataOnsCheckboxes ref='colors' title='Cores' data={this.props.colors} optionVal='name' dataState />
				<DataOnsCheckboxes ref='sizes' title='Tamanhos' data={this.state.categorySizes} optionVal='name' resetable dataState />

				<ons-button onClick={this.handleSubmit.bind(this)} style={{ display: 'block', margin: '50px 8px 15px 8px', textAlign: 'center', fontWeight: 'bold' }}>Buscar</ons-button>
			</div>
		);
	}
}

export default Search;