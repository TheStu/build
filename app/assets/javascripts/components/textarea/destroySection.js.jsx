var DestroySection = React.createClass({
  render: function() {
  	if (this.props.sectionCount <= 1) {
  		return (
	    	<button className="btn btn-danger btn-sm disabled">Delete Section</button>
	  	);
  	} else {
	    return (
	    	<button className="btn btn-danger btn-sm" onClick={this.props.handleDestroySection}>Delete Section</button>
	  	);
  	}
  }
});