import React, { Component } from 'react';


// =================
// Categories Select
// =================

class CategoriesSelect extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			category_id: (props.defaultValue || '')
		}
	}

	handleChange(event) {
		this.setState({
			category_id: event.target.value
		});

		if(typeof this.props.onChange === 'function') {
			this.props.onChange(event);
		}
	}

	render() {

		if(this.props.categories.length > 0) {
			return(
				<select ref="category_id" defaultValue={this.props.defaultValue || ''} onChange={this.handleChange.bind(this)}>
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
}

// ===========
// Size Select
// ===========

class SizeSelect extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			size_id: (props.defaultValue || '')
		}
	}

	handleChange(event) {
		// Changes the size_id state
		this.setState({
			size_id: event.target.value
		});
		
		// Executes any function passed as the onChange prop of this component
		if(typeof this.props.onChange === 'function') {
			this.props.onChange(event);
		}
	}

	render() {
		
		if(this.props.sizes.length > 0) {
			return(
				<select ref="size_id" defaultValue={this.props.defaultValue || ''} onChange={this.handleChange.bind(this)}>
					<option value="" disabled>Tamanho</option>
					{this.props.sizes.map((size) => 
						{
							return(
								size.category_id == this.props.category_id?
								(
									<option value={size.name} key={size._id}>{size.name}</option>
								):''
							);
						}
					)}
				</select>
			);
		}
		else {
			return(
				<p>Nenhum tamanho cadastrado.</p>
			);
		}
	}
}

// ==========
// DataSelect
// ==========

class DataSelect extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			_id: (props.defaultValue || '')
		}
	}

	handleChange(event) {
		this.setState({ _id: event.target.value }, function() {
			if(typeof this.props.onChange === 'function') {
				this.props.onChange(event);
			}
		});
	}

	render() {
		
		let optionVal = '_id';
		if(typeof this.props.optionVal !== 'undefined') optionVal = this.props.optionVal

		if(this.props.data.length > 0) {
			return(
				<select ref="_id" defaultValue={this.props.defaultValue || ''} onChange={this.handleChange.bind(this)}>
					<option value="" disabled>{this.props.placeholder}</option>
					{this.props.data.map((obj) => (
						<option value={obj[optionVal]} key={obj._id}>
							{obj.name}
						</option>
					))}
				</select>
			);
		}
		else {
			return(
				<p>Nenhuma opção de {this.props.placeholder} cadastrada.</p>
			);
		}
	}
}

// ==============
// DataCheckboxes
// ==============

class DataOnsCheckboxes extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: (props.defaultValue instanceof Array?props.defaultValue:[])
		}
	}

	handleChange(event) {
		
		let data = this.state.data;

		if(event.target.checked == true)
			data.push(event.target.value);
		else
			data.splice(data.indexOf(event.target.value),1);

		this.setState({ data: data }, function() {
			if(typeof this.props.onChange === 'function') {
				this.props.onChange(event);
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.resetable)
			this.setState({ data: (nextProps.defaultValue instanceof Array?nexpProps.defaultValue:[]) });
	}

	render() {

		let optionVal = '_id';
		if(typeof this.props.optionVal !== 'undefined') optionVal = this.props.optionVal
		
		if(this.props.data.length > 0) {
			return(
				<ons-list modifier='inset'>
					<ons-list-header>
						{this.props.title}
					</ons-list-header>
					{this.props.data.map((obj) => (
						<ons-list-item tappable key={obj._id} value={obj[optionVal]}>
							<label className="left">
								<ons-input type='checkbox' input-id={obj._id} value={obj[optionVal]} onClick={this.handleChange.bind(this)}></ons-input>
							</label>
							<label htmlFor={obj._id} className='center'>
								{obj.name}
							</label>
						</ons-list-item>
					))}
				</ons-list>
			);
		} else {
			return (<p>Nenhuma opção de {this.props.title} disponível.</p>);
		}
	}
}

export { CategoriesSelect, SizeSelect, DataSelect, DataOnsCheckboxes };