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

export { CategoriesSelect };