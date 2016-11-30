var Section = React.createClass({
	getInitialState: function() {
		return { editing: false }
	},
	editName: function() {
		this.setState({ editing: true });
	},
  render: function() {
    return (
    	<span>
				<span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.editName}></span>
	    	<span onClick={this.props.handleNameClick}>{this.props.section.title}</span>
    	</span>
  	);
  }
});
