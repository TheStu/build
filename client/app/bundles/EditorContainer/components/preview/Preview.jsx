import React, { PropTypes } from 'react';

export default class Preview extends React.Component {
  
  render() {
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
}