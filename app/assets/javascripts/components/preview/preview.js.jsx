var Preview = React.createClass({

  render: function() {
  	if ( this.props.showCover ) {
  		return (
	  		<img src={this.props.coverUrl}/>
			);
  	} else {
	    return (
      	<p>{this.props.sections[this.props.currentSectionIndex].body.substring(0,1000)}</p>
    	);
  	}
  }
});