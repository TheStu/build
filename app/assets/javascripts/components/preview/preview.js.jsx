var Preview = React.createClass({

  render: function() {
    return (
    	<p>{this.props.sections[this.props.currentSectionIndex].body.substring(0,1000)}</p>
  	);
  }
});