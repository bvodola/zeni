import React, { Component } from 'react';

// ==========
// Repeatable
// ==========
class Repeatable extends Component {

	constructor(props) {
		super(props);
		
		// Sets the initial state
		// count: Number of initial statements
		this.state = {
			count: 1
		};
	}

	addChild() {
		this.setState({count: this.state.count+1});
	}

	removeChild() {
		if(this.state.count > 1) {
			this.setState({count: this.state.count-1});
		}
	}

	renderChildren(children, refName) {
		// First we make sure that the refName parameter passed is a String
		refName = String(refName);

		// Iterating through the children of the repeatable component
		return React.Children.map(children, (child, j) => {
			
			// First, we check if this child is NOT the defaultRef child
			if(typeof child.props.defaultRef === 'undefined') {

				// Now we check if the refName prop for this child is defined
				if(typeof child.props.refName !== 'undefined') {
					refName = child.props.refName+refName;
				}

				// Then, if the refName is not defined, we must check if
				// this is the only child element inside the Repeatable component
				else {

					// If this is not the only child, we must set its ref to null
					// in order to avoid ref names conflict.
					if(children instanceof Array) {
						refName = null;
					}
				}
			}
			return React.cloneElement(child, { ref: refName });
		});
	}

	render() {
		return(
			<div className='repeatable'>
				{[...Array(this.state.count)].map((x,i) => (
					<div key={i}>
						{this.renderChildren(this.props.children, i)}
						<button onClick={this.removeChild.bind(this)}>X</button>
					</div>
				))}
				<button onClick={this.addChild.bind(this)}>+</button>
			</div>
		);
	}
}

// =======
// Helpers
// =======

class Helpers {

	// Sets all the ref values of INPUT, SELECT and TEXTAREAS to a handy { refName:refValue } object
	// Also, if any ReactElement with a ref defined has a dataState prop defined, this function will
	// check that Element for the value of the state named on the dataState prop and assign it to
	// the refName:refValue pair.
	//
	// Example:
	// TO-DO

	static getRefValues(refs) {
		let refValues = new Object();

		for (var key in refs) {
			if (refs.hasOwnProperty(key)) {
				if(typeof refs[key].nodeName !== 'undefined' && (refs[key].nodeName == 'INPUT' || refs[key].nodeName == 'SELECT' || refs[key].nodeName == 'TEXTAREA')) {
					refValues[key] = refs[key].value;
				} else if(typeof refs[key].props !== 'undefined' && typeof refs[key].props.dataState !== 'undefined') {
					if(refs[key].props.dataState === true)
						refValues[key] = refs[key].state['data'];
					else	
						refValues[key] = refs[key].state[refs[key].props.dataState];
				}
			}
		}
		return refValues;
	}
	
	// Merges the obj2 properties into ojb1. Overwrites any property
	// that may already exist in obj1
	static push(obj1,obj2) {
		var obj3 = {};
		for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
		for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
		return obj3;
	}
	
	// Receives an array of objects, a key and a value.
	// Returns the objects from the array that have a
	// matching key:val inside of them
	static searchArray(array,key,val) {
		let returnArray = $.grep(array, function(e) {
			return e[key] = val;
		});
		return returnArray;
	}

	// Receives an array of objects and a name string.
	// Returns the object from the array that has a
	// name property equals to the name parameter
	static getByName(array, name) {
		return $.grep(array, function(e) {
			return e.name = name;
		});	
	}

	
}

export { Repeatable, Helpers };