import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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

class FileUploader extends Component {

    constructor(props) {
        super(props);

        // Inline Style
        this.inlineStyle = {
            div: {
                width: '100%',
                marginLeft: -4
            },

            input: {
                width: 0.1,
                height: 0.1,
                opacity: 0,
                overflow: 'hidden',
                position: 'absolute',
                zIndex: -1
            },
            
            uploadIcon: {
                width: 30,
                fontSize: 20,
                lineHeight: '8px'
            },

            label: {
                fontSize: 15,
                // pointerEvents: 'none',
                display: 'inline-block'
            }
        }

        // Initial State
        this.state = {
            uploadedFiles: []
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if(ReactDOM.findDOMNode(this.refs.file).files && ReactDOM.findDOMNode(this.refs.file).files[0]) {
            
            // Sets the data to be sent using the FormData() class
            let file = ReactDOM.findDOMNode(this.refs.file).files[0];
            let data = new FormData();
            data.append('file',file);

            // Setting the FileUploader() class instance as fileUploader
            // to be used inside the $.ajax() success callback function
            let fileUploader = this;
            
            // Sends the data using jQuery.ajax function
            $.ajax({
                url: 'http://fs.bvodola.webfactional.com/upload/width/400/',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function(data){
                    // Appends Uploaded Image to the Component state
                    let uploadedFiles = fileUploader.state.uploadedFiles.concat(data);;
                    fileUploader.setState({uploadedFiles: uploadedFiles});
                }
            });
            
        }
    }

    render() {
        return(
            <div style={this.inlineStyle.div}>
                <input style={this.inlineStyle.input} name="file" id="file" type="file" ref="file" onChange={this.handleSubmit.bind(this)} />
                <label className="button button--large button--outline" htmlFor="file" style={this.inlineStyle.label}>
                    <ons-icon style={this.inlineStyle.uploadIcon} icon="ion-upload"></ons-icon>
                    Adicionar Imagem
                </label>
                <div ref="fileList">
                    <UploadedImages images={this.state.uploadedFiles} />
                </div>
            </div>
        )
    }

}

export default FileUploader;