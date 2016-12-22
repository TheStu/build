import React, { PropTypes } from 'react';
import TextEditor from './TextEditor';
import Cover from './Cover';
import MetaData from './MetaData';

export default class TextAreaContainer extends React.Component {

  render() {
    if ( this.props.showCover ) {

      return <Cover coverUrl={this.props.coverUrl} />

    } else if ( this.props.showMetaData ) {

      return <MetaData 
        book={this.props.book}
        handleBookUpdate={this.props.handleBookUpdate}
        handleTitleChange={this.props.handleTitleChange}
        handleAuthorChange={this.props.handleAuthorChange}
        handlePublishedDateChange={this.props.handlePublishedDateChange}
        handleSubtitleChange={this.props.handleSubtitleChange}
        handlePublisherChange={this.props.handlePublisherChange}
        handleDescriptionChange={this.props.handleDescriptionChange}
        handleSubjectChange={this.props.handleSubjectChange}
        handleLanguageChange={this.props.handleLanguageChange}
        handleIsbnChange={this.props.handleIsbnChange}
        handleVersionChange={this.props.handleVersionChange}
      />

    } else {

      return <TextEditor
        currentSectionIndex={this.props.currentSectionIndex}
        sections={this.props.sections}
        onChange={this.props.onChange}
        book={this.props.book}
      />
    }
  }
}