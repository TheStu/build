var Section = React.createClass({
	getInitialState: function() {
		return { 
			editing: false,
			title: this.props.section.title
		}
	},
	editName: function() {
		this.setState({ editing: true });
	},
	handleNameChange: function(e) {
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
		var data = { 'section': { 'title': this.state.title }};
		e.preventDefault();
		$.ajax({
	    type: 'PATCH',
	    url: '/sections/' + self.props.section.id,
	    data: data,
	    dataType: 'json',
	    success: function(data) {
        self.setState({ editing: false });
      },
      error: function(jqXHR, textStatus, errorThrown) {
      	JSON.parse(jqXHR.responseText).forEach((error) => {
  		  	$(".errors").append('<div class="alert alert-danger fade in widget-inner"><button type="button" class="close" data-dismiss="alert">×</button>' + error + '</div>');
      	});
      }
	  });
	},
  render: function() {
  	if ( this.state.editing ) {
	    return (
	    	<span>
					<form className="form-inline" onSubmit={this.handleSubmit}>
						<div className="form-group">
		          <input className="form-control section-title-input input-sm" type="text" value={this.state.title} onChange={this.handleNameChange} />
	          </div>
		        <button disabled={this.state.title === "" ? true : false} className={"btn btn-primary btn-xs section-title-input-btn" + (this.state.title === "" ? " disabled" : "")} type="submit">
		        	<i className="glyphicon glyphicon-ok" aria-hidden="true"></i>
		        </button>
		        <button disabled={this.state.title === "" ? true : false} className={'btn btn-danger btn-xs section-title-input-btn' + (this.state.title === "" ? " disabled" : "")} onClick={this.handleNoChange}>
		        	<i className="glyphicon glyphicon-remove" aria-hidden="true"></i>
		        </button>
		      </form>
	    	</span>
	  	);
  	} else {
	    return (
	    	<span>
					<span className="glyphicon glyphicon-pencil section-edit" aria-hidden="true" onClick={this.editName}></span>
		    	<span className="section-name" onClick={this.props.handleNameClick}>{this.state.title}</span>
		    	<span className="float-right">
		    		<span className="glyphicon glyphicon-triangle-top section-index-up" aria-hidden="true" onClick={() => this.props.changeSectionIndex(this.props.currentSectionIndex + 1)}></span>
		    		<span className="glyphicon glyphicon-triangle-bottom section-index-down" aria-hidden="true" onClick={() => this.props.changeSectionIndex(this.props.currentSectionIndex - 1)}></span>
		    	</span>
	    	</span>
	  	);
  	}
  }
});
