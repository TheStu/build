var AddCover = React.createClass({
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