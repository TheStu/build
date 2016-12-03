var Cover = React.createClass({
	handleChange: function(e) {
		this.props.onChange(e.target.value);
	},
  render: function() {
    return (
    	<img src={this.props.cover_url} />
  	);
  }
});