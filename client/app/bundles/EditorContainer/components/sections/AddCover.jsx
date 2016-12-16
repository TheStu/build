import React, { PropTypes } from 'react';

export default class AddCover extends React.Component {
	
	componentDidMount() {
    Dropzone.options.coverUpload = { 
      paramName: "cover",
      method: "put",
      headers: { 'X-CSRF-Token': gon.auth_token },
      previewsContainer: false,
      acceptedFiles: "image/jpeg,image/png,image/tiff",
      success: (file, response) => {
        this.props.handleCoverUploadSuccess(response.cover.url)
      },
      error: (file, response, xhr) => {
        this.props.handleCoverUploadFailure(response);
      }
    }
	}

  render() {
  	if ( this.props.coverUrl === "" ) {
	    return (
	    	<form action={ '/books/' + this.props.bookId } className="dropzone" id="coverUpload"></form>
	  	);
    } else {
      if ( this.props.showCover ) {
        return (
          <ul>
            <li className="active-section-li">Cover</li>
          </ul>
        );
      } else {
        return (
          <ul>
            <li onClick={this.props.handleShowCover}>Cover</li>
          </ul>
        );
      }
    }
  }
}