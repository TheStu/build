var Body = React.createClass({
	handleChange: function(e) {
		this.props.onChange(e.target.value);
	},
  render: function() {
    return (
    	<textarea value={this.props.displaySection.body} onChange={this.handleChange}/>
  	);
  }
});