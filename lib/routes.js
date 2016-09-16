// =======
// Imports
// =======

// Main Libraries
import { Meteor } from 'meteor/meteor';
import React from 'react';
import {mount} from 'react-mounter';

// App Structure
import App from '../imports/ui/containers/App.jsx';

// Containers
import AddProduct from '../imports/ui/containers/AddProduct.jsx';
import { AdminCategoriesListComponent, CategoriesListComponent } from '../imports/ui/containers/Categories.jsx';
import { AdminBrandsListComponent, BrandsListComponent } from '../imports/ui/containers/Brands.jsx';
import { AdminSizesListComponent } from '../imports/ui/containers/Sizes.jsx';
import { AdminColorsListComponent } from '../imports/ui/containers/Colors.jsx';
import ProductsList from '../imports/ui/containers/ProductsList.jsx';
import Product from '../imports/ui/containers/Product.jsx';
import Cart from '../imports/ui/containers/Cart.jsx';
import OrdersList from '../imports/ui/containers/OrdersList.jsx';
import Profile from '../imports/ui/containers/Profile.jsx';
import Profiles from '../imports/ui/containers/Profiles.jsx';

// APIs
import { Categories } from '../imports/api/categories.js';
import { Products } from '../imports/api/products.js';
import { Sizes } from '../imports/api/sizes.js';

// ======
// Routes
// ======

FlowRouter.route('/', {
	action: function() {
		mount(App, {pageTitle: 'Lançamentos', content: (<ProductsList />)});
	}
});

FlowRouter.route('/new', {
	action: function() {
		mount(App, {pageTitle: 'Lançamentos', content: (<ProductsList />)});
	}
});

FlowRouter.route('/search', {
	action: function(params, queryParams) {

		// Parameters that expect multiple choices are expected to be passed
		// with the filtered values separated by commas
		// Example: /search?categories=Hug98sdjg384ja,JDjsdsj98a7fh3,Njfidjj82ufj82

		// Set the query parameters in a less verbose way
		let {categories, brands, price1, price2, colors, sizes} = queryParams;

		// Split the comma-separated values in arrays
		if(typeof categories !== 'undefined') categories = categories.split(',');
		if(typeof brands !== 'undefined') brands = brands.split(',');
		if(typeof colors !== 'undefined') colors = colors.split(',');
		if(typeof sizes !== 'undefined') sizes = sizes.split(',');

		mount(App, {pageTitle: 'Lançamentos', content: (<ProductsList search={true} categories={categories} brands={brands} price1={price1} price2={price2} colors={colors} sizes={sizes} />)});
	}
});

FlowRouter.route('/logout', {
	action: function() {
		Meteor.logout(function() {
			FlowRouter.go('/');	
		});
		
	}
});

FlowRouter.route('/profile', {
	action: function() {
		mount(App, {pageTitle: 'Perfil', content: (<Profile />)});
	}
});

FlowRouter.route('/profiles', {
	action: function() {
		mount(App, {pageTitle: 'Meus Clientes', content: (<Profiles />)});
	}
});

FlowRouter.route('/cart', {
	action: function() {
		mount(App, {pageTitle: 'Meu Carrinho', content: (<Cart />)});
	}
});

FlowRouter.route('/orders', {
	action: function() {
		mount(App, {pageTitle: 'Meus Pedidos', content: (<OrdersList />)});
	}
});

FlowRouter.route('/products/add', {
	action: function() {
		mount(App, {pageTitle: 'Novo Produto', content: (<AddProduct />)});
	}
});

FlowRouter.route('/categories', {
	action: function() {
		mount(App, {pageTitle: 'Departamentos', content: (<CategoriesListComponent />)});
	}
});

FlowRouter.route('/categories/add', {
	action: function() {
		mount(App, {pageTitle: 'Editar Departamentos', content: (<AdminCategoriesListComponent />)});
	}
});

FlowRouter.route('/brands/add', {
	action: function() {
		mount(App, {pageTitle: 'Editar Marcas', content: (<AdminBrandsListComponent />)});
	}
});

FlowRouter.route('/sizes/add', {
	action: function() {
		mount(App, {pageTitle: 'Editar Tamanhos', content: (<AdminSizesListComponent />)});
	}
});

FlowRouter.route('/category/:id', {
	action: function(params) {
		mount(App, {pageTitle: 'Lista de Produtos', content: (<ProductsList category_id={params.id} />)});
	}
});

FlowRouter.route('/colors/add', {
	action: function() {
		mount(App, {pageTitle: 'Editar Cores', content: (<AdminColorsListComponent />)});
	}
});

FlowRouter.route('/product/:id', {
	action: function(params) {
		app = new App();
		mount(App, {pageTitle: 'Detalhes do Produto', content: (<Product product_id={params.id} />)});
	}
});