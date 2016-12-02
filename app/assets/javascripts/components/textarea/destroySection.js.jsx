var DestroySection = React.createClass({
  render: function() {
  	return (
    	<button className={"btn btn-danger btn-sm" + (this.props.sectionCount <= 1 ? " disabled" : "")}>Delete Section</button>
  	);
  }
});