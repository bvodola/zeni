import React, { Component } from 'react';

class UploadedImages extends Component {

	constructor(props) {
		super(props);

		this.style = {
			removeImageIcon: {
				fontSize: "35px",
				color: "rgb(183, 28, 28)",
				position: "absolute",
				right: "5px",
				opacity: "0.7",
				top: "3px"
			},

			image: {
				maxWidth: '100%',
				height: 'auto'
			},

			imageDiv: {
				"display": "inline-block",
				"borderRadius": "5px",
				"position": "relative",
				"margin": "10px 0"
			}
		}
	}

	removeImage(event){
		$(event.target).parent().remove();
	}
	
	render() {
		return(
			<div>
				{this.props.images.map((src, index) => (
					<div style={this.style.imageDiv} key={src.split('/').splice(-1)}>
						<ons-icon onClick={this.removeImage.bind(this)} style={this.style.removeImageIcon} icon="ion-close-circled"></ons-icon>
						<img style={this.style.image} src={src} />
						<input type="hidden" value={src} name="images[]" />
					</div>
				))}
			</div>
		);
	}

}

export default UploadedImages;