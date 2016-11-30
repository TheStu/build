var Sections = React.createClass({
  render: function() {
    return (
    	<ul>
    		{this.props.sections.map((section, index) => {
    			return (
	    			<li key={index}>
	    				<Section handleNameClick={() => this.props.handleNameClick(index)} section={section} />
	  				</li>
  				);
    		})}
  		</ul>
  	);
  }
});