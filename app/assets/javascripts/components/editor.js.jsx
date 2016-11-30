var Editor = React.createClass({
	getInitialState: function() {
		return {
			title: this.props.book["title"],
			body: this.props.book["body"]
		};
	},
	handleBodyText: function(text) {
		this.setState({ body: text })
	},
  render: function() {
    return (
    	<div>
	    	<h1>hello</h1>
	    	<Title/>
	    	<Body onChange={this.handleBodyText}/>
	    	<Preview previewText={this.state.body}/>
    	</div>
  	);
  }
});
