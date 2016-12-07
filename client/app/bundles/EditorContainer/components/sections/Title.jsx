import React, { PropTypes } from 'react';

export default class Title extends React.Component {

	constructor(props) {
		super(props);
		this. editTitle = this. editTitle.bind(this);
		this. handleTitleChange = this. handleTitleChange.bind(this);
		this. handleNoChange = this. handleNoChange.bind(this);
		this. handleEditSuccess = this. handleEditSuccess.bind(this);
		this. handleSubmit = this. handleSubmit.bind(this);
		this.state = {
			editing: false,
			title: this.props.book.title
		}
	}

	editTitle() {
		this.setState({ editing: true });
	}

	handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleNoChange(e) {
		e.preventDefault();
  	this.setState({ editing: false })
  }

  handleEditSuccess() {
  	this.setState({ editing: false })
  }

	handleSubmit(e) {
		var self = this;
		var data = { 'book': { 'title': this.state.title }};
		e.preventDefault();
		$.ajax({
	    type: 'PATCH',
	    url: '/books/' + self.props.book.id,
	    data: data,
	    dataType: 'json',
	    success: function(data) {
        self.setState({ editing: false });
      },
      error: function(jqXHR, textStatus, errorThrown) {
      	this.props.handleRailsErrors(JSON.parse(jqXHR.responseText));
      }
	  });
	}

  render() {
  	if ( this.state.editing ) {
	    return (
	    	<span>
					<form className="form-inline" onSubmit={this.handleSubmit}>
						<div className="form-group">
		          <input className="form-control book-title-input" type="text" value={this.state.title} onChange={this.handleTitleChange} />
	          </div>
		        <button disabled={this.state.title === "" ? true : false} className={"btn btn-primary btn-xs section-title-input-btn" + (this.state.title === "" ? " disabled" : "")} type="submit">
		        	<i className="glyphicon glyphicon-ok" aria-hidden="true"></i>
		        </button>
		        <button disabled={this.state.title === "" ? true : false} className={"btn btn-danger btn-xs section-title-input-btn" + (this.state.title === "" ? " disabled" : "")} onClick={this.handleNoChange}>
		        	<i className="glyphicon glyphicon-remove" aria-hidden="true"></i>
		        </button>
		      </form>
	    	</span>
	  	);
  	} else {
  	  return (
  	  	<h1>
					<span className="glyphicon glyphicon-pencil section-edit" aria-hidden="true" onClick={this.editTitle}></span>
		    	<span onClick={this.props.handlTitleClick}>{this.state.title}</span>
	    	</h1>
  		);
  	}
  }
}