import React, { PropTypes } from 'react';

import Preview from './preview/Preview';
import AddCover from './sections/AddCover';
import AddSection from './sections/AddSection';
import Sections from './sections/Sections';
import Title from './sections/Title';
import DestroySection from './textarea/DestroySection';
import TextArea from './textarea/TextArea';

export default class EditorContainer extends React.Component {
	constructor(props) {
		super(props);
		this. updateBook = this. updateBook.bind(this);
		this. changeDisplayedSection = this. changeDisplayedSection.bind(this);
		this. changeSectionText = this. changeSectionText.bind(this);
		this. addSection = this. addSection.bind(this);
		this. destroySection = this. destroySection.bind(this);
		this. destroyCover = this. destroyCover.bind(this);
		this. updateSectionText = this. updateSectionText.bind(this);
		this. changeSectionIndex = this. changeSectionIndex.bind(this);
		this. handleIndexReorder = this. handleIndexReorder.bind(this);
		this. handleShowCover = this. handleShowCover.bind(this);
		this. handleCoverUploadSuccess = this. handleCoverUploadSuccess.bind(this);
		this. handleRailsErrors = this. handleRailsErrors.bind(this);
		this.state = {
			sections: this.props.sections, // add an unsavedChanges boolean field
			currentSectionIndex: 0,
			isSectionBodyChanged: false,
			showCover: false,
			coverUrl: this.props.cover_url
		}
	}

	updateBook(book) {
		var self = this;
		$.ajax({
	    type: 'PATCH',
	    url: '/books/' + self.props.book.id,
	    data: { book },
	    dataType: 'json',
	    success: function(data) {
	    	// show cover
	    	console.log("image upload success!");
      },
      error: function(jqXHR, textStatus, errorThrown) {
      	self.handleRailsErrors(JSON.parse(jqXHR.responseText));
      }
	  });
	}

	changeDisplayedSection(sectionIndex) {
		this.updateSectionText();
		this.setState({ currentSectionIndex: sectionIndex, showCover: false });
	}

	changeSectionText(newText) {
		var dupSections = this.state.sections;
		dupSections[this.state.currentSectionIndex].body = newText;
		this.setState({ 
			sections: dupSections,
			isSectionBodyChanged: true 
		});
	}

	addSection() {
		var self = this;
		var data = { 'section': { 'book_id': this.props.book.id, 'order_index': this.state.sections.length }};
		$.ajax({
		  type: 'POST',
		  url: '/sections',
		  data: data,
		  dataType: 'json',
		  success: function(data) {
		    self.setState({ sections: self.state.sections.concat(data) });
		  },
		  error: function(jqXHR, textStatus, errorThrown) {
		    self.handleRailsErrors(JSON.parse(jqXHR.responseText));
		  }
		});
	}

	destroySection() {
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
		    self.handleRailsErrors(JSON.parse(jqXHR.responseText));
		  }
		});
	}

	destroyCover() {
		var self = this;
		$.ajax({
		  type: 'GET',
		  url: '/books/' + self.props.book.id + '/delete-cover',
		  success: function(data) {
		    self.setState({ 
		    	showCover: false,
		    	coverUrl: '' 
		    });
		  },
		  error: function(jqXHR, textStatus, errorThrown) {
		    self.handleRailsErrors(JSON.parse(jqXHR.responseText));
		  }
		});
	}

	updateSectionText() {
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
	      	self.handleRailsErrors(JSON.parse(jqXHR.responseText));
	      }
		  });
	  }
	}

	changeSectionIndex(originSectionIndex, targetSectionIndex) {
		var self = this;
		var data = { 'section': { 'order_index': targetSectionIndex }};
		$.ajax({
	    type: 'PATCH',
	    url: '/sections/' + self.state.sections[originSectionIndex].id + '/change_index',
	    data: data,
	    dataType: 'json',
	    success: function(data) {
	    	self.handleIndexReorder(originSectionIndex, targetSectionIndex);
      },
      error: function(jqXHR, textStatus, errorThrown) {
      	self.handleRailsErrors(JSON.parse(jqXHR.responseText));
      }
	  });
	}

	handleIndexReorder(originSectionIndex, targetSectionIndex) {
		var dupSections = this.state.sections;
		var currentSection = this.state.sections[originSectionIndex];
		dupSections[originSectionIndex] = this.state.sections[targetSectionIndex];
		dupSections[targetSectionIndex] = currentSection;
		if ( originSectionIndex === this.state.currentSectionIndex ) {
			this.setState({ 
				sections: dupSections,
				currentSectionIndex: targetSectionIndex
			});
		} else {
			this.setState({ sections: dupSections });
		}
	}

	handleShowCover() {
		this.setState({ showCover: true });
	}

	handleCoverUploadSuccess(url) {
		this.setState({ 
			coverUrl: url,
			showCover: true
		});
	}

	handleRailsErrors(errors) {
		if ( typeof errors === 'array' ) {
	  	errors.forEach((error) => {
		  	$(".errors").append('<div class="alert alert-danger fade in widget-inner"><button type="button" class="close" data-dismiss="alert">×</button>' + error + '</div>');
	  	});
	  } else if ( typeof errors === 'string' ) {
	  	$(".errors").append('<div class="alert alert-danger fade in widget-inner"><button type="button" class="close" data-dismiss="alert">×</button>' + errors + '</div>');
	  }
	}

  render() {
    return (
    	<div className="editor">
	    	<div className="sections">
		    	<Title
		    		showCover={this.state.showCover}
		    		book={this.props.book}
		    		handleRailsErrors={this.handleRailsErrors}
	    		/>
	    		<AddCover 
	    			bookId={this.props.book.id}
	    			handleShowCover={this.handleShowCover}
	    			coverUrl={this.state.coverUrl}
	    			showCover={this.state.showCover}
	    			handleCoverUploadSuccess={this.handleCoverUploadSuccess}
	    			handleCoverUploadFailure={this.handleRailsErrors}
    			/>
		    	<Sections 
		    		sections={this.state.sections}
		    		currentSectionIndex={this.state.currentSectionIndex} 
		    		handleNameClick={this.changeDisplayedSection}
		    		changeSectionIndex={this.changeSectionIndex}
		    		showCover={this.state.showCover}
	    		/>
	    		<AddSection handleNewSection={this.addSection}/>
	    	</div>

	    	<div className="text-area">
	    		<span className="saved-notice">Saved!</span>
		    	<TextArea
		    		showCover={this.state.showCover}
		    		coverUrl={this.state.coverUrl}
		    		onChange={this.changeSectionText}
		    		currentSectionIndex={this.state.currentSectionIndex}
		    		sections={this.state.sections}
		    		updateSectionText={this.updateSectionText}
	    		/>
	    		<div className="text-area-footer">
		    		<DestroySection 
			    		sectionCount={this.state.sections.length}
			    		handleDestroySection={this.destroySection}
			    		handleDestroyCover={this.destroyCover}
			    		showCover={this.state.showCover}
		    		/>
	    		</div>
	    	</div>

	    	<div className="preview">
		    	<Preview
		    		sections={this.state.sections}
		    		currentSectionIndex={this.state.currentSectionIndex}
		    		showCover={this.state.showCover}
		    		coverUrl={this.state.coverUrl}
	    		/>
	    	</div>
    	</div>
  	);
  }
}
