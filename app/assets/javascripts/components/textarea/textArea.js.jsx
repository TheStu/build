var TextArea = React.createClass({
	handleChange: function(e) {
		this.props.onChange(e.target.value);
	},
  render: function() {
  	if ( this.props.showCover ) {
  		return (
	  		<img src={this.props.coverUrl}/>
			);
  	} else {
	    return (
	    	<textarea value={this.props.sections[this.props.currentSectionIndex].body} onChange={this.handleChange}/>
	  	);
  	}
  }
});