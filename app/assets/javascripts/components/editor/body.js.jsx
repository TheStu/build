var Body = React.createClass({
	handleChange: function(e) {
		this.props.onChange(e.target.value);
	},
  render: function() {
    return (
    	<textarea onChange={this.handleChange}/>
  	);
  }
});