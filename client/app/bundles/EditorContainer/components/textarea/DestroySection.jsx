import React, { PropTypes } from 'react';

export default class DestroySection extends React.Component {
	
  render() {
  	return (
    	<button 
    		onClick={ this.props.showCover ? this.props.handleDestroyCover : this.props.handleDestroySection }
    		className={"btn btn-danger btn-sm" + (this.props.sectionCount <= 1 ? " disabled" : "")} 
        disabled={ this.props.sectionCount <= 1 }
  		>Delete { this.props.showCover ? "Cover" : "Section" }</button>
  	);
  }
}