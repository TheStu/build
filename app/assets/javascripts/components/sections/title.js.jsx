var Title = React.createClass({
		getInitialState: function() {
			return { 
				editing: false,
				title: this.props.book.title
			}
		},
		editTitle: function() {
			this.setState({ editing: true });
		},
		handleTitleChange: function(e) {
	    this.setState({ title: e.target.value });
	  },
	  handleNoChange: function(e) {
			e.preventDefault();
	  	this.setState({ editing: false })
	  },
	  handleEditSuccess: function() {
	  	this.setState({ editing: false })
	  },
		handleSubmit: function(e) {
			var self = this;
			var data = { 'book': { 'title': this.state.title }};
			e.preventDefault();
			$.ajax({
		    type: 'PATCH',
		    url: '/books/' + self.props.book.id,
		    data: data,
		    dataType: 'json',
		    success: function(data) {
	        self.setState({ editing: false });
	      },
	      error: function(jqXHR, textStatus, errorThrown) {
	      	this.props.handleRailsErrors(jqXHR);
	      }
		  });
		},
  render: function() {
  	if ( this.state.editing ) {
	    return (
	    	<span>
					<form className="form-inline" onSubmit={this.handleSubmit}>
						<div className="form-group">
		          <input className="form-control book-title-input" type="text" value={this.state.title} onChange={this.handleTitleChange} />
	          </div>
		        <button disabled={this.state.title === "" ? true : false} className={"btn btn-primary btn-xs section-title-input-btn" + (this.state.title === "" ? " disabled" : "")} type="submit">
		        	<i className="glyphicon glyphicon-ok" aria-hidden="true"></i>
		        </button>
		        <button disabled={this.state.title === "" ? true : false} className={"btn btn-danger btn-xs section-title-input-btn" + (this.state.title === "" ? " disabled" : "")} onClick={this.handleNoChange}>
		        	<i className="glyphicon glyphicon-remove" aria-hidden="true"></i>
		        </button>
		      </form>
	    	</span>
	  	);
  	} else {
  	  return (
  	  	<h1>
					<span className="glyphicon glyphicon-pencil section-edit" aria-hidden="true" onClick={this.editTitle}></span>
		    	<span onClick={this.props.handlTitleClick}>{this.state.title}</span>
	    	</h1>
  		);
  	}
  }
});