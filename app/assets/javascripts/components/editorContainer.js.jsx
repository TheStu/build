var EditorContainer = React.createClass({
	getInitialState: function() {
		return {
			title: this.props.book.title,
			sections: this.props.sections,
			currentSectionIndex: 0,
		};
	},
	changeDisplayedSection: function(section_id) {
		this.setState({ 
			currentSectionIndex: this.state.sections.findIndex((section) => { return section_id == section.id }),
		});
	},
	changeSectionText: function(newText) {
		var dupSections = this.state.sections;
		dupSections[this.state.currentSectionIndex].body = newText
		this.setState({ sections: dupSections	});
	},
	addSection: function() {
		var self = this;
		var data = { 'section': { 'book_id': this.props.book.id }};
		$.ajax({
		  type: 'POST',
		  url: '/sections',
		  data: data,
		  dataType: 'json',
		  success: function(data) {
		    self.setState({ sections: self.state.sections.concat(data) });
		  },
		  error: function(jqXHR, textStatus, errorThrown) {
		    self.handleRailsErrors(jqXHR);
		  }
		});
	},
	destroySection: function() {
		var self = this;
		var section_id = this.state.sections[this.state.currentSectionIndex].id;
		var dupSections = this.state.sections;
		dupSections.splice(this.state.currentSectionIndex, 1);
		$.ajax({
		  type: 'DELETE',
		  url: '/sections/' + section_id,
		  success: function(data) {
		    self.setState({ 
		    	sections: dupSections,
		    	currentSectionIndex: self.state.currentSectionIndex == 0 ? 1 : self.state.currentSectionIndex - 1 
		    });
		  },
		  error: function(jqXHR, textStatus, errorThrown) {
		    self.handleRailsErrors(jqXHR);
		  }
		});
	},
	handleRailsErrors: function(errors) {
  	JSON.parse(errors.responseText).forEach((error) => {
	  	$(".errors").append('<div class="alert alert-danger fade in widget-inner"><button type="button" class="close" data-dismiss="alert">×</button>' + error + '</div>');
  	});
	},
  render: function() {
    return (
    	<div className="editor">
	    	<div className="sections">
		    	<Title title={this.state.title}/>
		    	<Sections 
		    		sections={this.state.sections}
		    		currentSectionIndex={this.state.currentSectionIndex} 
		    		handleNameClick={this.changeDisplayedSection}
	    		/>
	    		<AddSection handleNewSection={this.addSection}/>
	    	</div>

	    	<div className="text-area">
		    	<TextArea
		    		onChange={this.changeSectionText}
		    		currentSectionIndex={this.state.currentSectionIndex}
		    		sections={this.state.sections}
	    		/>
	    		<div className="text-area-footer">
		    		<DestroySection 
			    		sectionCount={this.state.sections.length}
			    		handleDestroySection={this.destroySection}
		    		/>
	    		</div>
	    	</div>

	    	<div className="preview">
		    	<Preview
		    		sections={this.state.sections}
		    		currentSectionIndex={this.state.currentSectionIndex}
	    		/>
	    	</div>
    	</div>
  	);
  }
});
