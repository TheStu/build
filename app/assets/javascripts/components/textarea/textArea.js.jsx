var TextArea = React.createClass({
	handleChange: function(e) {
		this.props.onChange(e.target.value);
	},
  render: function() {
    return (
    	<textarea value={this.props.sections[this.props.currentSectionIndex].body} onChange={this.handleChange}/>
  	);
  }
});