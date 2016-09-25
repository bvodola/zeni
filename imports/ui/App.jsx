import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Navigator, Page, List, ListItem, Toolbar, Button, ToolbarButton, Icon, Splitter, SplitterSide, SplitterContent } from 'react-onsenui';
import AccountsUIWrapper from './wrappers/AccountsUIWrapper.jsx';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {isOpen: false, isSwipeable: false};
		this.hide = this.hide.bind(this);
		this.show = this.show.bind(this);
		this.renderToolbar = this.renderToolbar.bind(this);
	}

	componentDidMount() {
		console.log(Meteor.user());
	}

	hide() {
		this.setState({isOpen: false});
	}

	show() {
		this.setState({isOpen: true});
	}

	back() {
		window.history.go(-1);
	}

	renderToolbar() {
		return (
			<Toolbar>
				<div className='left'>
					<ToolbarButton onClick={this.back}>
						<ons-icon class="ion-chevron-left"></ons-icon>
					</ToolbarButton>
				</div>
				<div className='center'>{this.props.pageTitle}</div>
				<div className="right">
					<ToolbarButton onClick={this.show}>
						<Icon icon='ion-navicon, material:md-menu' />
					</ToolbarButton>
				</div>
			</Toolbar>
		);
	}

	renderSideMenu() {
		return(
			<div className="side-menu">
				<ons-list>
					<a href='/new'><ons-list-item onClick={this.hide} tappable>Lançamentos</ons-list-item></a>
					<a href='/categories'><ons-list-item onClick={this.hide} tappable>Departamentos</ons-list-item></a>
					<a href='/search'><ons-list-item onClick={this.hide} tappable>Buscar</ons-list-item></a>

					{Meteor.user().verified?(
						<a href='/cart'><ons-list-item onClick={this.hide} tappable>Meu Carrinho</ons-list-item></a>
					):null}
					
					<a href='/products/add'><ons-list-item onClick={this.hide} tappable>Novo Produto</ons-list-item></a>
					<a href='/categories/add'><ons-list-item onClick={this.hide} tappable>Editar Departamentos</ons-list-item></a>
					<a href='/colors/add'><ons-list-item onClick={this.hide} tappable>Editar Cores</ons-list-item></a>
					<a href='/brands/add'><ons-list-item onClick={this.hide} tappable>Editar Marcas</ons-list-item></a>
					<a href='/sizes/add'><ons-list-item onClick={this.hide} tappable>Editar Tamanhos</ons-list-item></a>
					<a href='/profile'><ons-list-item onClick={this.hide} tappable>Perfil</ons-list-item></a>
					<a href='/profiles'><ons-list-item onClick={this.hide} tappable>Meus Clientes</ons-list-item></a>
					<a href='/logout'><ons-list-item onClick={this.hide} tappable>Desconectar</ons-list-item></a>
				</ons-list>
			</div>
		);
	}

	render() {
		if(Meteor.user()) {
		return(
			<div>
				<Splitter>
					<SplitterSide
						style={{
							boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
						}}
						side='right'
						width={200}
						collapse={true}
						isSwipeable={this.state.isSwipeable}
						isOpen={this.state.isOpen}
						onClose={this.hide}
						onOpen={this.show}
					>
						<Page>
							{this.renderSideMenu()}
						</Page>
					</SplitterSide>
					<SplitterContent>
						<Page renderToolbar={this.renderToolbar}>
							<main>
								{this.props.content}
							</main>
						</Page>
					</SplitterContent>
				</Splitter>
			</div>
		);
		}
		else {
			return (
				<div className="login">
					<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQzMC42MjQgNDMwLjYyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDMwLjYyNCA0MzAuNjI0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cG9seWdvbiBzdHlsZT0iZmlsbDpub25lOyIgcG9pbnRzPSI5MS43NiwxNjYuMjA3IDEwOC4wMzUsMjUwLjE3IDE1MC44NDUsMjUwLjE3IDEzNy4wNSwxNjYuMjA3ICAgIi8+CgkJPHBhdGggc3R5bGU9ImZpbGw6bm9uZTsiIGQ9Ik0xMzIuNDE0LDM2Ny4wNzdjMCwxMy42NjksMTEuMTIxLDI0Ljc4OSwyNC43OTEsMjQuNzg5YzEzLjY2OCwwLDI0Ljc4Ny0xMS4xMiwyNC43ODctMjQuNzg5ICAgIHMtMTEuMTE5LTI0Ljc4OS0yNC43ODctMjQuNzg5QzE0My41MzUsMzQyLjI4OSwxMzIuNDE0LDM1My40MDgsMTMyLjQxNCwzNjcuMDc3eiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOm5vbmU7IiBkPSJNMzA1LjY5NSwzNjcuMDc3YzAsMTMuNjY5LDExLjEyMywyNC43ODksMjQuNzkzLDI0Ljc4OWMxMy42NjgsMCwyNC43ODktMTEuMTIsMjQuNzg5LTI0Ljc4OSAgICBzLTExLjEyMS0yNC43ODktMjQuNzg5LTI0Ljc4OUMzMTYuODE4LDM0Mi4yODksMzA1LjY5NSwzNTMuNDA4LDMwNS42OTUsMzY3LjA3N3oiLz4KCQk8cG9seWdvbiBzdHlsZT0iZmlsbDpub25lOyIgcG9pbnRzPSIxNzUuMTY1LDI1MC4xNyAyMzAuMTU4LDI1MC4xNyAyMzAuMTU4LDE2Ni4yMDcgMTYxLjM3MSwxNjYuMjA3ICAgIi8+CgkJPHBvbHlnb24gc3R5bGU9ImZpbGw6bm9uZTsiIHBvaW50cz0iMzM0LjI2MSwyNTAuMTcgMzc1LjY0LDI1MC4xNyAzOTIuMjk4LDE2Ni4yMDcgMzQ2LjMxNCwxNjYuMjA3ICAgIi8+CgkJPHBvbHlnb24gc3R5bGU9ImZpbGw6bm9uZTsiIHBvaW50cz0iMjU0LjE1OCwyNTAuMTcgMzEwLjAxNSwyNTAuMTcgMzIyLjA2OCwxNjYuMjA3IDI1NC4xNTgsMTY2LjIwNyAgICIvPgoJCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiM3M0QwRjQ7IiBwb2ludHM9Ijg3LjEwOSwxNDIuMjA4IDM5Ny4wNiwxNDIuMjA4IDQwNC4wMDksMTA3LjE4OCA4MC4zMiwxMDcuMTg4ICAgIi8+CgkJPHBhdGggc3R5bGU9ImZpbGw6IzNENjg4OTsiIGQ9Ik00MjcuODk4LDg3LjU3M2MtMi4yNzktMi43NzYtNS42ODItNC4zODYtOS4yNzMtNC4zODZINzUuNjY4TDY0LjI4OSwyNC40NzQgICAgYy0xLjA5NC01LjY0Mi02LjAzNS05LjcxNy0xMS43ODEtOS43MTdIMTJjLTYuNjI5LDAtMTIsNS4zNzMtMTIsMTJzNS4zNzEsMTIsMTIsMTJoMzAuNjA5bDUxLjY3NCwyNzAuNDA0ICAgIGMxLjAxLDUuNzM4LDUuOTk0LDkuOTIyLDExLjgxOCw5LjkyMmg0Mi4zODhjLTIyLjc1Nyw0LjEyMi00MC4wNzYsMjQuMDY3LTQwLjA3Niw0Ny45OTVjMCwyNi45MDIsMjEuODg3LDQ4Ljc5LDQ4Ljc5LDQ4Ljc5ICAgIGMyNi45MDIsMCw0OC43ODctMjEuODg3LDQ4Ljc4Ny00OC43OWMwLTIzLjkyNy0xNy4zMTYtNDMuODcyLTQwLjA3NC00Ny45OTVoMTU1Ljg1NWMtMjIuNzU4LDQuMTIyLTQwLjA3OCwyNC4wNjctNDAuMDc4LDQ3Ljk5NSAgICBjMCwyNi45MDIsMjEuODg5LDQ4Ljc5LDQ4Ljc5Myw0OC43OWMyNi45MDIsMCw0OC43ODktMjEuODg3LDQ4Ljc4OS00OC43OWMwLTIzLjkyNy0xNy4zMTgtNDMuODcyLTQwLjA3NC00Ny45OTVoMzYuNTQxICAgIGM2LjYyNywwLDEyLTUuMzczLDEyLTEyYzAtNi42MjgtNS4zNzMtMTItMTItMTJIMTE2LjE3NkwxMTIuNSwyNzQuMTdoMjcyLjk5MmM1LjcyOSwwLDEwLjY1Ni00LjA0NywxMS43NzItOS42NjVsMzMuMTMxLTE2Ni45ODIgICAgQzQzMS4wOTMsOTQsNDMwLjE3Nyw5MC4zNDksNDI3Ljg5OCw4Ny41NzN6IE0zNTUuMjc3LDM2Ny4wNzdjMCwxMy42NjktMTEuMTIxLDI0Ljc4OS0yNC43ODksMjQuNzg5ICAgIGMtMTMuNjcsMC0yNC43OTMtMTEuMTItMjQuNzkzLTI0Ljc4OXMxMS4xMjMtMjQuNzg5LDI0Ljc5My0yNC43ODlDMzQ0LjE1NiwzNDIuMjg5LDM1NS4yNzcsMzUzLjQwOCwzNTUuMjc3LDM2Ny4wNzd6ICAgICBNMTgxLjk5MiwzNjcuMDc3YzAsMTMuNjY5LTExLjExOSwyNC43ODktMjQuNzg3LDI0Ljc4OWMtMTMuNjcsMC0yNC43OTEtMTEuMTItMjQuNzkxLTI0Ljc4OXMxMS4xMjEtMjQuNzg5LDI0Ljc5MS0yNC43ODkgICAgQzE3MC44NzIsMzQyLjI4OSwxODEuOTkyLDM1My40MDgsMTgxLjk5MiwzNjcuMDc3eiBNMTA4LjAzNSwyNTAuMTdMOTEuNzYsMTY2LjIwN2g0NS4yOWwxMy43OTUsODMuOTYzSDEwOC4wMzV6IE0yMzAuMTU4LDI1MC4xNyAgICBoLTU0Ljk5MmwtMTMuNzk1LTgzLjk2M2g2OC43ODdWMjUwLjE3eiBNMzEwLjAxNSwyNTAuMTdoLTU1Ljg1N3YtODMuOTYzaDY3LjkxTDMxMC4wMTUsMjUwLjE3eiBNMzc1LjY0LDI1MC4xN2gtNDEuMzc5ICAgIGwxMi4wNTMtODMuOTYzaDQ1Ljk4NEwzNzUuNjQsMjUwLjE3eiBNMzk3LjA2LDE0Mi4yMDhIODcuMTA5bC02Ljc4OS0zNS4wMmgzMjMuNjg5TDM5Ny4wNiwxNDIuMjA4eiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
					<p>Zeni Sport</p>
					<AccountsUIWrapper />
				</div>
			);
		}
	}
}

export default App;