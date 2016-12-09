import React, { PropTypes } from 'react';

export default class Preview extends React.Component {

  handleHTML() {
    let header = "<div class='pg-header'><h2>" + this.props.sections[this.props.currentSectionIndex].title + "</h2></div>"
    return header + this.props.sections[this.props.currentSectionIndex].body
  }
  
  render() {
  	if ( this.props.showCover ) {
  		return (
	  		<img src={this.props.coverUrl}/>
			);
  	} else {
	    return (
      	<div className="pg-text-area" dangerouslySetInnerHTML={{ __html: this.handleHTML() }} />
    	);
  	}
  }
}