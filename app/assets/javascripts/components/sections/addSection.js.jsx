var AddSection = React.createClass({
  render: function() {
    return (
    	<button className="btn btn-primary btn-sm" onClick={this.props.handleNewSection}>New Section</button>
  	);
  }
});