import React, { Component } from 'react';
import VenueCard from './VenueCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SideBar extends Component {

	constructor(props) {
    super(props);

    this.state = {
      query: ''
    }
  }

  handleChange = (query) => {
    this.setState({ query });
    
    this.props.venues.map((v) => {
      const isMatched = v.venue.name.toLowerCase().includes(query.toLowerCase());

      const marker = this.props.markers.find(marker => marker.id === v.venue.id);

      if (isMatched) {
        marker.visible = true;
      } else {
        marker.visible = false;
      }
    });
  }

  render() {
		
    return (

    	<section id="sidebar" className="sidebar" style={{ display: this.props.displaySidebar }}>
    		<div className="sidebar-upper">
    			
    			<button className="info-button" id="infoButton">About PTWA</button>
					<form>
	    			<input 
	    				className="input" 
	    				id="filterInput" 
	    				name="filter" 
	    				placeholder="Search for places in Port Townsend" 
	    				title="search"
	    				type="text"
	    				aria-labelledby="aria-input-description"
	    				onChange={(event) => this.handleChange(event.target.value)}
	    			/>
	    			<label id="aria-input-description" className="hide-element">Search for places in Port Townsend</label>

	    			<button className="filter-button" id="filterButton" type="submit" title="filter">
							<FontAwesomeIcon
						    icon="search"
						    className="icon"
						    size="lg"
						  />
	    			</button>
	    		</form>
    		</div>

    		<div className="venues-list" id="venuesList">
    			<ul className="venue-list">
						{this.props.venues.map((venueItem) => {
							return (
								<li key={venueItem.venue.id} className="list-item">
									<VenueCard 
										venueDetails={venueItem}
									/>
								</li>
								)
							})
						}
    			</ul>
    		</div>

    	</section>

    );
  }
}

export default SideBar;
