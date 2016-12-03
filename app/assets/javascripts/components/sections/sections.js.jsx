var Sections = React.createClass({
  render: function() {
    return (
    	<ul>
    		{this.props.sections.map((section, index) => {
    			return (
	    			<li key={section.id} className={"clearfix" + (this.props.currentSectionIndex == index ? " active-section-li" : "")}>
	    				<Section
                handleNameClick={() => this.props.handleNameClick(index)}
                section={section}
                currentSectionIndex={this.props.currentSectionIndex}
                changeSectionIndex={this.props.changeSectionIndex}
                isFirstSection={index === 0}
                isLastSection={index + 1 === this.props.sections.length}
                index={index}
              />
	  				</li>
  				);
    		})}
  		</ul>
  	);
  }
});