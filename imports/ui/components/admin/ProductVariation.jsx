import React from 'react';

const ProductVariation = ({i, onRemoveVariation}) => (
	<ons-list modifier='inset'>
		<ons-list-header>
			Variação {i+1}
			{(i>0)?<ons-icon onClick={onRemoveVariation()} icon="ion-close-circled" size="40px" fixed-width="true"></ons-icon>:''}
		</ons-list-header>
		<ons-list-item>
			<ons-input name='color' type='text' placeholder='Cor' />
		</ons-list-item>
		<ons-list-item>
			<ons-input name='size' type='text' placeholder='Tamanho' />
		</ons-list-item>
		<ons-list-item>
			<ons-input name='stock' type='text' placeholder='Estoque' />
		</ons-list-item>
		<ons-list-item>
			<ons-input name='price' type='text' placeholder='Preço' />
		</ons-list-item>
	</ons-list>
);

export default ProductVariation;