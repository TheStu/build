var EditorContainer = React.createClass({
	getInitialState: function() {
		return {
			sections: this.props.sections, // add an unsavedChanges boolean field
			currentSectionIndex: 0,
			isSectionBodyChanged: false
		};
	},
	changeDisplayedSection: function(sectionIndex) {
		this.updateSectionText();
		this.setState({ currentSectionIndex: sectionIndex });
	},
	changeSectionText: function(newText) {
		var dupSections = this.state.sections;
		dupSections[this.state.currentSectionIndex].body = newText
		this.setState({ 
			sections: dupSections,
			isSectionBodyChanged: true 
		});
	},
	addSection: function() {
		var self = this;
		var data = { 'section': { 'book_id': this.props.book.id, 'order_index': this.state.sections.length + 1 }};
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
	updateSectionText: function() {
		if ( this.state.isSectionBodyChanged ) {
			var self = this;
			var data = { 'section': { 'body': this.state.sections[this.state.currentSectionIndex].body }};
			$.ajax({
		    type: 'PATCH',
		    url: '/sections/' + self.state.sections[this.state.currentSectionIndex].id,
		    data: data,
		    dataType: 'json',
		    success: function(data) {
		    	$('.saved-notice').css('display', 'inline');
	        $('.saved-notice').fadeOut(1000);
	        self.setState({ isSectionBodyChanged: false });
	      },
	      error: function(jqXHR, textStatus, errorThrown) {
	      	JSON.parse(jqXHR.responseText).forEach((error) => {
	  		  	$(".errors").append('<div class="alert alert-danger fade in widget-inner"><button type="button" class="close" data-dismiss="alert">×</button>' + error + '</div>');
	      	});
	      }
		  });
	  }
	},
	changeSectionIndex: function(targetSectionIndex) {
		// change it in DB
		var self = this;
		var data = { 'section': { 'order_index': targetSectionIndex }};
		$.ajax({
	    type: 'PATCH',
	    url: '/sections/change_index' + self.state.sections[this.state.currentSectionIndex].id,
	    data: data,
	    dataType: 'json',
	    success: function(data) {
	    	var dupSections = this.state.sections
	    	var currentSection = this.state.sections[currentSectionIndex]
	    	dupSections[currentSectionIndex] = this.state.sections[targetSectionIndex]
	    	dupSections[targetSectionIndex] = currentSection
	    	this.setState({ sections: dupSections })
      },
      error: function(jqXHR, textStatus, errorThrown) {
      	JSON.parse(jqXHR.responseText).forEach((error) => {
  		  	$(".errors").append('<div class="alert alert-danger fade in widget-inner"><button type="button" class="close" data-dismiss="alert">×</button>' + error + '</div>');
      	});
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
		    	<Title 
		    		book={this.props.book}
		    		handleRailsErrors={this.handleRailsErrors}
	    		/>
		    	<Sections 
		    		sections={this.state.sections}
		    		currentSectionIndex={this.state.currentSectionIndex} 
		    		handleNameClick={this.changeDisplayedSection}
		    		changeSectionIndex={this.changeSectionIndex}
	    		/>
	    		<AddSection handleNewSection={this.addSection}/>
	    	</div>

	    	<div className="text-area">
	    		<span className="saved-notice">Saved!</span>
		    	<TextArea
		    		onChange={this.changeSectionText}
		    		currentSectionIndex={this.state.currentSectionIndex}
		    		sections={this.state.sections}
		    		updateSectionText={this.updateSectionText}
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
