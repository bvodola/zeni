import React from 'react';

const CategoriesList = ({categories}) => (
	<ons-list>
		<ons-list-header>Departamentos</ons-list-header>
		{categories.map((category) => (
			<a href={'category/'+category._id} key={category._id}>
			<ons-list-item >
				
					<div className="center">
						{category.name}
					</div>
				
			</ons-list-item>
			</a>
		))}
	</ons-list>
);

export default CategoriesList;