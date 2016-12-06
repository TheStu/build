var TextArea = React.createClass({
	componentDidMount: function() {
		// var editor = new wysihtml5.Editor("wysihtml-textarea", {
  //     toolbar:      "wysihtml-toolbar",
  //     //parserRules:  wysihtmlParserRules, // defined in parser rules set
  //     //stylesheets:  "<%= stylesheet_path('wysihtml') %>", // optional, css to style the editor's content
  //     //showToolbarAfterInit: false
  //  	});
	},
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
		    	<textarea id="wysihtml-textarea-temp" value={this.props.sections[this.props.currentSectionIndex].body} onChange={this.handleChange}/>
	  	);
  	}
  }
});