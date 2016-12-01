var Preview = React.createClass({

  render: function() {
    return (
    	<p>{this.props.sections[this.props.currentSectionIndex].body}</p>
  	);
  }
});