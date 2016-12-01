var Sections = React.createClass({
  render: function() {
    return (
    	<ul>
    		{this.props.sections.map((section) => {
    			return (
	    			<li key={section.id}>
	    				<Section handleNameClick={() => this.props.handleNameClick(section.id)} section={section} />
	  				</li>
  				);
    		})}
  		</ul>
  	);
  }
});