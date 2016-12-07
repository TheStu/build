import React, { PropTypes } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export default class TextArea extends React.Component {

	constructor(props) {
		super(props);
		this. handleChange = this. handleChange.bind(this);
		this. handleInitialContent = this. handleInitialContent.bind(this);
		this.state = {
			content: ''
		}
	}

	handleChange(content) {
		this.props.onChange(draftToHtml(content));
	}

	componentWillMount() {
		const contentBlocks = convertFromHTML(this.props.sections[this.props.currentSectionIndex].body);
		const contentState = ContentState.createFromBlockArray(contentBlocks);
		const initialContentState = convertToRaw(contentState);
		this.setState({ content: initialContentState });
	}

	handleInitialContent() {
		
	}

  render() {
  	if ( this.props.showCover ) {
  		return (
	  		<img src={this.props.coverUrl}/>
			);
  	} else {
	    return (
    		<Editor contentState={this.state.content} onChange={this.handleChange.bind(this)} />
	  	);
  	}
  }
}