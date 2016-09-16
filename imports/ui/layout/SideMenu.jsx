import React, { Component } from 'react';
import { List, ListItem } from 'react-onsenui';

class SideMenu extends Component {

	render() {
		return(
			<div className="side-menu">
			<List
				dataSource={[
					{route: '/new', title: 'Lançamentos'},
					{route: '/categories', title: 'Departamentos'},
					{route: '/cart', title: 'Meu Carrinho'},
					{route: '/products/add', title: 'Novo Produto'},
					{route: '/categories/add', title: 'Editar Departamentos'},
					{route: '/colors/add', title: 'Editar Cores'},
					{route: '/profile', title: 'Perfil', verifyUser: true},
					{route: '/profiles', title: 'Meus Clientes'},
					{route: '/logout', title: 'Desconectar'}
				]} 
				renderRow={(item) =>(
					<a key={item.title} href={item.route}><ListItem onClick={this.props.hide()} tappable>{item.title}</ListItem></a>
				)}
			/>
			<ons-list>
				<ons-list-item tappable>Teste</ons-list-item>
			</ons-list>
			</div>

		);
	}

}

export default SideMenu;