import React, { PropTypes } from 'react';

export default class Section extends React.Component {

	constructor(props) {
		super(props);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTitleChange(e) {
		this.props.handleTitleChange(e.target.value);
  }

  handleSubmit(e) {
  	e.preventDefault();
  	this.props.handleNewTitleSubmit();
  }

  render() {
  	if ( this.props.isEditingTitle && this.props.currentSectionIndex == this.props.index ) {
	    return (
	    	<span>
					<form className="form-inline" onSubmit={this.handleSubmit}>
						<div className="form-group">
		          <input className="form-control section-title-input input-sm" type="text" value={this.props.section.title} onChange={this.handleTitleChange} />
	          </div>
		        <button disabled={this.props.section.title === "" ? true : false} className={"btn btn-primary btn-xs section-title-input-btn" + (this.props.section.title === "" ? " disabled" : "")} type="submit">
		        	<i className="glyphicon glyphicon-ok" aria-hidden="true"></i>
		        </button>
		      </form>
	    	</span>
	  	);
  	} else if ( this.props.currentSectionIndex == this.props.index && !this.props.showCover ) {
	    return (
	    	<span>
					<span className="glyphicon glyphicon-pencil section-edit pull-left btn btn-xs btn-primary" aria-hidden="true" onClick={this.props.handleEditTitle}></span>
		    	<span className="section-name pull-left btn btn-xs btn-primary" onClick={this.props.handleNameClick}>{this.props.section.title}</span>
		    	<span className="pull-right">
		    		<button className="btn btn-xs btn-primary section-index-up" disabled={this.props.isFirstSection} onClick={() => this.props.changeSectionIndex(this.props.index, this.props.index - 1)}>
		    			<span className="glyphicon glyphicon-triangle-top" aria-hidden="true" ></span>
	    			</button>
	    			<button className="btn btn-xs btn-primary section-index-down" disabled={this.props.isLastSection} onClick={() => this.props.changeSectionIndex(this.props.index, this.props.index + 1)}>
		    			<span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true" ></span>
	    			</button>
		    	</span>
	    	</span>
	  	);
  	} else {
      return (
        <span>
          <span className="section-name pull-left btn btn-xs btn-primary" onClick={this.props.handleNameClick}>{this.props.section.title}</span>
          <span className="pull-right">
            <button className="btn btn-xs btn-primary section-index-up" disabled={this.props.isFirstSection} onClick={() => this.props.changeSectionIndex(this.props.index, this.props.index - 1)}>
              <span className="glyphicon glyphicon-triangle-top" aria-hidden="true" ></span>
            </button>
            <button className="btn btn-xs btn-primary section-index-down" disabled={this.props.isLastSection} onClick={() => this.props.changeSectionIndex(this.props.index, this.props.index + 1)}>
              <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true" ></span>
            </button>
          </span>
        </span>
      );
    }
  }
}
