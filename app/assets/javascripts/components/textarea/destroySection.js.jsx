var DestroySection = React.createClass({
  render: function() {
  	return (
    	<button 
    		onClick={ this.props.showCover ? this.props.handleDestroyCover : this.props.handleDestroySection }
    		className={"btn btn-danger btn-sm" + (this.props.sectionCount <= 1 ? " disabled" : "")}
  		>Delete { this.props.showCover ? "Cover" : "Section" }</button>
  	);
  }
});