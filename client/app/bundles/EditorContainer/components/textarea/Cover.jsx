import React, { PropTypes } from 'react';

export default class Cover extends React.Component {

  constructor(props) {
    super(props);
    this. handleCoverDimensions = this. handleCoverDimensions.bind(this);
  }

  handleCoverDimensions() {
    var img = document.getElementById("cover-img-text-area");
    $(".cover-dimensions").append(img.naturalWidth + " x " + img.naturalHeight);
  }

  render() {
    return (
      <div className="center cover-container">
        <div className="cover-dimensions" />
        <img id="cover-img-text-area" className="cover-img-text-area" src={this.props.coverUrl} onLoad={this.handleCoverDimensions.bind(this)}/>
      </div>
    );
  }
}