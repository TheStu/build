import React, { PropTypes } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, ContentState, convertToRaw, convertFromRaw, getSafeBodyFromHTML, DefaultDraftBlockRenderMap } from 'draft-js';
import { convertToHTML } from 'draft-convert';

export default class TextArea extends React.Component {

	constructor(props) {
		super(props);

    this. handleChange = this. handleChange.bind(this);
		this. changeContent = this. changeContent.bind(this);
		this. uploadImageCallback = this. uploadImageCallback.bind(this);
		this.state = { content: '' }
	}

  componentWillMount() {
    this.changeContent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.currentSectionIndex !== nextProps.currentSectionIndex ) {
      this.changeContent(nextProps);
    }
  }

  changeContent(newProps) {
    let html = newProps.sections[newProps.currentSectionIndex].body;
    const blockRenderMap = DefaultDraftBlockRenderMap.set('p', { element: 'p' });
    const blocksFromHTML = convertFromHTML(html, getSafeBodyFromHTML, blockRenderMap)
      .map(block => (block.get('type') === 'p' ? block.set('type', 'unstyled') : block));
    const contentState = ContentState.createFromBlockArray(blocksFromHTML);
    const initialContentState = convertToRaw(contentState);
    this.setState({ content: initialContentState });
  }

	handleChange(content) {
    let html = convertToHTML({
      styleToHTML: (style) => {
        if (style === 'STRIKETHROUGH') {
          return <strike />;
        }
        if (style === 'SUPERSCRIPT') {
          return <sup />;
        }
        if (style === 'SUBSCRIPT') {
          return <sub />;
        }
      },
      blockToHTML: (block) => {
        if (block.type === 'header-three') {
          return <h3 className="body-h3" />;
        }
        if (block.type === 'unstyled') {
          return <p className="body-paragraph" />;
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'LINK') {
          return <a href={entity.data.url}>{originalText}</a>;
        }
        return originalText;
      }
    })(convertFromRaw(content));
    html = html.replace('<p class="body-paragraph">', '<p class="body-paragraph first-paragraph">'); // replaces first one only by default
    html = html.replace(/>([^<])/, '><span class="first-letter">$1</span>');
		this.props.onChange(html);
  }

  // componentWillMount() {
    
  //   this.setState({ content: initialContentState });
  // }

	uploadImageCallback(file) {
		var self = this;
		return new Promise(
	    (resolve, reject) => {
	      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
	      xhr.open('POST', '/images');
	      xhr.setRequestHeader('X-CSRF-Token', gon.auth_token);
	      const data = new FormData(); // eslint-disable-line no-undef
	      data.append('image', file);
	      data.append('book_id', self.props.bookId);
	      xhr.send(data);
	      xhr.addEventListener('load', () => {
	      	console.log(JSON.parse(xhr.responseText));
	        const response = JSON.parse(xhr.responseText);
	        resolve(response);
	      });
	      xhr.addEventListener('error', () => {
	        const error = JSON.parse(xhr.responseText);
	        reject(error);
	      });
	    }
	  );
	}

  render() {
  	if ( this.props.showCover ) {
  		return (
        <div className="center cover-container">
  	  		<img className="cover-img-text-area" src={this.props.coverUrl}/>
        </div>
			);
  	} else {

	    return (
    		<Editor 
    			contentState={this.state.content} 
    			onChange={this.handleChange.bind(this)}
    			uploadCallback={this.uploadImageCallback}
    			toolbar={{
    				options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'history']//, 
  				    // 'fontSize', 'fontFamily', 'colorPicker', 'emoji', 'remove', 
  				  // inline: {
  				  //   inDropdown: false, 
  				  //   className: undefined, 
  				  //   options: ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'], 
  				  //   bold: { icon: bold, className: undefined }, 
  				  //   italic: { icon: italic, className: undefined }, 
  				  //   underline: { icon: underline, className: undefined }, 
  				  //   strikethrough: { icon: strikethrough, className: undefined }, 
  				  //   code: { icon: code, className: undefined }, 
  				  //   superscript: { icon: superscript, className: undefined }, 
  				  //   subscript: { icon: subscript, className: undefined }, 
  				  // }, 
  				  // blockType: { className: undefined, dropdownClassName: undefined }, 
  				  // fontSize: { icon: fontSize, className: undefined }, 
  				  // fontFamily: { className: undefined, dropdownClassName: undefined }, 
  				  // list: {
  				  //   inDropdown: false, 
  				  //   className: undefined, 
  				  //   options: unorderedorderedindentoutdent, 
  				  //   unordered: { icon: unordered, className: undefined }, 
  				  //   ordered: { icon: ordered, className: undefined }, 
  				  //   indent: { icon: indent, className: undefined }, 
  				  //   outdent: { icon: outdent, className: undefined }, 
  				  // }, 
  				  // textAlign: {
  				  //   inDropdown: false, 
  				  //   className: undefined, 
  				  //   options: leftcenterrightjustify, 
  				  //   left: { icon: left, className: undefined }, 
  				  //   center: { icon: center, className: undefined }, 
  				  //   right: { icon: right, className: undefined }, 
  				  //   justify: { icon: justify, className: undefined }, 
  				  // }, 
  				  // colorPicker: { icon: color, className: undefined, popClassName: undefined }, 
  				  // link: {
  				  //   inDropdown: false, 
  				  //   className: undefined, 
  				  //   popClassName: undefined, 
  				  //   options: linkunlink, 
  				  //   link: { icon: link, className: undefined },
  				  //   unlink: { icon: unlink, className: undefined }, 
  				  // }, 
  				  // embedded: { icon: image, className: undefined, popClassName: undefined }, 
  				  // emoji: { icon: emoji, className: undefined, popClassName: undefined }, 
  				  // image: { icon: image, className: undefined, popClassName: undefined }, 
  				  // remove: { icon: eraser, className: undefined }, 
  				  // history: {
  				  //   inDropdown: false, 
  				  //   className: undefined, 
  				  //   options: undoredo, 
  				  //   undo: { icon: undo, className: undefined }, 
  				  //   redo: { icon: redo, className: undefined }, 
  				  // }
    			}}
  			/>
	  	);
  	}
  }
}