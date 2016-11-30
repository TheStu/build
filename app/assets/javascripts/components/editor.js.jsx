var Editor = React.createClass({
	getInitialState: function() {
		return {
			title: this.props.book.title,
			body: this.props.book.body,
			displaySection: this.props.sections[0]
		};
	},
	changeDisplayedSection: function(section_id) {
		this.setState({ displaySection: this.props.sections[section_id] });
	},
	changeBodyText: function(updatedText) {
		this.setState({ displaySection: updatedText });
	},
  render: function() {
    return (
    	<div className="editor">
	    	<div className="chapters">
		    	<Title/>
		    	<Sections sections={this.props.sections} handleNameClick={this.changeDisplayedSection}/>
	    	</div>

	    	<div className="text-area">
		    	<Body onChange={this.changeBodyText} displaySection={this.state.displaySection}/>
	    	</div>

	    	<div className="preview">
		    	<Preview displaySection={this.state.displaySection}/>
	    	</div>
    	</div>
  	);
  }
});
