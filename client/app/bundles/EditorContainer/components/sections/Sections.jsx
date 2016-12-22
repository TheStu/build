import React, { PropTypes } from 'react';
import Section from './Section';

export default class Sections extends React.Component {
  
  render() {
    return (
    	<ul>
    		{this.props.sections.map((section, index) => {
    			return (
	    			<li key={section.id} className={"clearfix section-li" + ((this.props.currentSectionIndex == index && !this.props.showCover) ? " active-section-li" : "")}>
	    				<Section
                handleNameClick={() => this.props.handleNameClick(index)}
                handleNameChange={this.props.handleNameChange}
                section={section}
                currentSectionIndex={this.props.currentSectionIndex}
                changeSectionIndex={this.props.changeSectionIndex}
                isFirstSection={index === 0}
                isLastSection={index + 1 === this.props.sections.length}
                index={index}
                isEditingTitle={this.props.isEditingTitle}
                handleEditTitle={this.props.handleEditTitle}
                handleTitleChange={this.props.handleTitleChange}
                handleNewTitleSubmit={this.props.handleNewTitleSubmit}
                showCover={this.props.showCover}
              />
	  				</li>
  				);
    		})}
  		</ul>
  	);
  }
}