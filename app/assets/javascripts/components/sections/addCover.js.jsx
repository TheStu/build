var AddCover = React.createClass({
	componentDidMount: function() {
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
	},
  render: function() {
  	if ( this.props.coverUrl != "" ) {
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
  	} else {
	    return (
	    	<form action={ '/books/' + this.props.bookId } className="dropzone" id="coverUpload"></form>
	  	);
    }
  }
});