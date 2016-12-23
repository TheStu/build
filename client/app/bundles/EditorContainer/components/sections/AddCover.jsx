import React, { PropTypes } from 'react';
var Dropzone = require('react-dropzone');
var request = require('superagent');

export default class AddCover extends React.Component {

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    self = this;
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    var req = request.put('/books/' + this.props.bookId);
    acceptedFiles.forEach((file)=> {
      req.attach('cover', file);
    });
    req.end(function(err, res) {
      if ( err ) {
        self.props.handleCoverUploadFailure(JSON.parse(res.text));
      } else {
        self.props.handleCoverUploadSuccess(JSON.parse(res.text).cover.url);
      }
    });
  }

  render() {
  	if ( this.props.coverUrl === "" ) {
	    return (
	    	<Dropzone onDrop={this.onDrop} accept={'image/*'} className="dropzone-area">
          <div>Drop or click to upload your cover image file.</div>
        </Dropzone>
	  	);
    } else {
      if ( this.props.showCover ) {
        return (
          <ul className="cover-ul">
            <li className="active-section-li"><span className="btn btn-primary btn-xs btn-round">Cover</span></li>
          </ul>
        );
      } else {
        return (
          <ul className="cover-ul">
            <li onClick={this.props.handleShowCover}><span className="btn btn-primary btn-xs btn-round">Cover</span></li>
          </ul>
        );
      }
    }
  }
}