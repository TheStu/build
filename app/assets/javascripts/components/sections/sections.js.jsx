var Sections = React.createClass({
  render: function() {
    return (
    	<ul>
    		{this.props.sections.map((section, index) => {
    			return (
	    			<li key={index} className={ this.props.currentSectionIndex == index ? "active-section-li" : "" }>
	    				<Section
                handleNameClick={() => this.props.handleNameClick(index)}
                section={section}
                currentSectionIndex={this.props.currentSectionIndex}
                changeSectionIndex={this.props.changeSectionIndex}
              />
	  				</li>
  				);
    		})}
  		</ul>
  	);
  }
});