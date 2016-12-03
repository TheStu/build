var AddCover = React.createClass({
  render: function() {
    return (
    	<form action={ '/books/' + this.props.bookId } className="dropzone" id="coverUpload"></form>
  	);
  }
});