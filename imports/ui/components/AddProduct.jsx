import { Random } from 'meteor/random';
import React, { Component } from 'react';
import FileUploader from './FileUploader.jsx';
import ProductVariation from './admin/ProductVariation.jsx';
import { SizeSelect, DataSelect } from './partials/Partials.jsx';
import { Helpers } from '../helpers/Helpers.jsx';
import { Products } from '../../api/products.js';

class AddProduct extends Component {

	constructor(props) {
		super(props);
		this.state = {
			variations: 1,
			category_id: ''
		}
		this.style = {

			addVariationButton: {
				margin: '-20px 8px 0 8px',
				display: 'block',
				textAlign: 'center'
			},

			addVariationButtonIcon: {
				fontSize: '20px',
				lineHeight: '8px',
				marginRight: 4
			},

			removeVariationIcon: {
				lineHeight: '8px',
				fontSize: '24px',
				float: 'right',
				marginRight: '10px',
				color: '#b71c1c'
			},

			submitButton: {
				display: 'block',
				margin: '50px 8px 15px 8px',
				textAlign: 'center',
				fontWeight: 'bold'
			}
		}
	}

	componentDidMount() {
		$(this.refs.price).mask("#.##0,00", {reverse: true});
	}

	handleSubmit() {

		// Setting the query
		let query = setQuery();
		
		// Unmasking the price input
		query['price'] = $(this.refs.price).cleanVal();
		query['created'] = new Date();
		
		// Set the Product Variations
		query['variations'] = [];
		for(let i=0; i<this.state.variations; i++ ) {
			query['variations'].push({
				_id: Random.id(),
				color: this.refs['variation'+i+'.color'].state._id, 
				size: this.refs['variation'+i+'.size'].state.size_id, 
			});
		}

		// Saving to the database and clearing fields
		Products.insert(query);
		clearFields();
	}
	

	// This function changes the category_id state
	// everytime the Category Select changes
	handleCategoryChange(event) {
		this.setState({
			category_id: event.target.value
		});
	}

	renderCategories() {
		
		if(this.props.categories.length > 0) {
			return(
				<select name="category_id" defaultValue="" onChange={this.handleCategoryChange.bind(this)}>
					<option value="" disabled>Departamento</option>
					{this.props.categories.map((category) => (
						<option value={category._id} key={category._id}>
							{category.name}
						</option>
					))}
				</select>
			);
		}
		else {
			return(
				<p>Nenhuma categoria cadastrada.</p>
			);
		}
	}
	
	renderBrands() {
		
		if(this.props.brands.length > 0) {
			return(
				<select name="brand_id" defaultValue="">
					<option value="" disabled>Marca</option>
					{this.props.brands.map((brand) => (
						<option value={brand._id} key={brand._id}>
							{brand.name}
						</option>
					))}
				</select>
			);
		}
		else {
			return(
				<p>Nenhuma marca cadastrada.</p>
			);
		}
	}

	renderVariations() {
		return(
			<div class="product-variations">
				{[...Array(this.state.variations)].map((x,i) => (
					<ons-list modifier='inset' key={i} ref={'variation'+i}>
						<ons-list-header>
							Variação {i+1}
							{(i>0)?<ons-icon onClick={this.removeVariation.bind(this)} style={this.style.removeVariationIcon} icon="ion-close-circled"></ons-icon>:''}
						</ons-list-header>
						<ons-list-item>
							<DataSelect placeholder='Cor' optionVal='name' data={this.props.colors} ref={'variation'+i+'.color'} />
						</ons-list-item>
						<ons-list-item>
							<SizeSelect ref={'variation'+i+'.size'} sizes={this.props.sizes} category_id={this.state.category_id} />
						</ons-list-item>
					</ons-list>
				))}
			</div>
		);
	}
	
	addVariation() {
		this.setState({variations: this.state.variations+1});
	}

	removeVariation() {
		this.setState({variations: this.state.variations-1});	
	}

	render() {
		return(
			<form>
				<ons-list modifier='inset'>
					<ons-list-header>Dados Principais</ons-list-header>	
					<ons-list-item>
						{this.renderCategories()}
					</ons-list-item>
					
					<ons-list-item>
						{this.renderBrands()}
					</ons-list-item>

					<ons-list-item>
						<ons-input name='name' type='text' placeholder='Nome/Modelo' />
					</ons-list-item>

					<ons-list-item>
						<input ref='price' name='price' type='text' placeholder='Preço (R$)' className='text-input' />
					</ons-list-item>

				</ons-list>

				{this.renderVariations()}
				<ons-button style={this.style.addVariationButton} class="button button--outline" onClick={this.addVariation.bind(this)}>
					<ons-icon icon="ion-plus-circled" style={this.style.addVariationButtonIcon} fixed-width="true"></ons-icon>
					Adicionar Variação
				</ons-button>
				
				<ons-list modifier='inset'>
					<ons-list-header>
						Imagens
					</ons-list-header>	
					<ons-list-item>
						<FileUploader />
					</ons-list-item>
				</ons-list>

				<ons-button style={this.style.submitButton} onClick={this.handleSubmit.bind(this)}>Cadastrar</ons-button>
			</form>
		);
	}
}

export default AddProduct;