import React, { PropTypes } from 'react';

export default class Section extends React.Component {

	constructor(props) {
		super(props);
		this. editName = this. editName.bind(this);
		this. handleNameChange = this. handleNameChange.bind(this);
		this. handleNoChange = this. handleNoChange.bind(this);
		this. handleEditSuccess = this. handleEditSuccess.bind(this);
		this. handleSubmit = this. handleSubmit.bind(this);
		this.state = {
			editing: false,
			title: this.props.section.title
		}
	}

	editName() {
		this.setState({ editing: true });
	}

	handleNameChange(e) {
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
		var data = { 'section': { 'title': this.state.title }};
		e.preventDefault();
		$.ajax({
	    type: 'PATCH',
	    url: '/sections/' + self.props.section.id,
	    data: data,
	    dataType: 'json',
	    success: function(data) {
        self.setState({ editing: false });
      },
      error: function(jqXHR, textStatus, errorThrown) {
      	JSON.parse(jqXHR.responseText).forEach((error) => {
  		  	$(".errors").append('<div class="alert alert-danger fade in widget-inner"><button type="button" class="close" data-dismiss="alert">×</button>' + error + '</div>');
      	});
      }
	  });
	}

  render() {
  	if ( this.state.editing ) {
	    return (
	    	<span>
					<form className="form-inline" onSubmit={this.handleSubmit}>
						<div className="form-group">
		          <input className="form-control section-title-input input-sm" type="text" value={this.state.title} onChange={this.handleNameChange} />
	          </div>
		        <button disabled={this.state.title === "" ? true : false} className={"btn btn-primary btn-xs section-title-input-btn" + (this.state.title === "" ? " disabled" : "")} type="submit">
		        	<i className="glyphicon glyphicon-ok" aria-hidden="true"></i>
		        </button>
		        <button disabled={this.state.title === "" ? true : false} className={'btn btn-danger btn-xs section-title-input-btn' + (this.state.title === "" ? " disabled" : "")} onClick={this.handleNoChange}>
		        	<i className="glyphicon glyphicon-remove" aria-hidden="true"></i>
		        </button>
		      </form>
	    	</span>
	  	);
  	} else {
	    return (
	    	<span>
					<span className="glyphicon glyphicon-pencil section-edit" aria-hidden="true" onClick={this.editName}></span>
		    	<span className="section-name" onClick={this.props.handleNameClick}>{this.state.title}</span>
		    	<span className="pull-right">
		    		<button disabled={this.props.isFirstSection} onClick={() => this.props.changeSectionIndex(this.props.index, this.props.index - 1)}>
		    			<span className="glyphicon glyphicon-triangle-top section-index-up" aria-hidden="true" ></span>
	    			</button>
	    			<button disabled={this.props.isLastSection} onClick={() => this.props.changeSectionIndex(this.props.index, this.props.index + 1)}>
		    			<span className="glyphicon glyphicon-triangle-bottom section-index-down" aria-hidden="true" ></span>
	    			</button>
		    	</span>
	    	</span>
	  	);
  	}
  }
}
