import React, { PropTypes } from 'react';

export default class AddSection extends React.Component {
	
  render() {
    return (
    	<button className="btn btn-primary btn-sm" onClick={this.props.handleNewSection}>New Section</button>
  	);
  }
}