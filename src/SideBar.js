import React, { Component } from 'react';
import VenueCard from './VenueCard';

class SideBar extends Component {

	constructor(props) {
    super(props);

    this.state = {
      query: '',
      searchResults: []
    }
  }
  
  // Filter markers based on user input
  filterVenues = (query) => {
    this.setState({ query })
    
    // Set marker visibility
    this.props.venues.map((v) => {
      const isMatched = v.venue.name.toLowerCase().includes(query.toLowerCase());

      const marker = this.props.markers.find(marker => marker.id === v.venue.id);

      if (isMatched) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }

      return marker;
    });

    this.updateResults(query);
  }
  
  // Filter venue list based on user input
  updateResults = (query) => {
    if (query) {
      const searchResults = this.props.venues.filter((v) => v.venue.name.toLowerCase().includes(query.toLowerCase()));
      this.setState({ searchResults })
    } else {
      this.setState({ searchResults: [] })
    }
  }

  render() {
    
    // Check for user input to display all venues by default
    let filtered = this.state.query ? this.state.searchResults : this.props.venues;
		
    return (

    	<section id="sidebar" className="sidebar" style={{ display: this.props.displaySidebar }}>
    		<div className="sidebar-upper">
    			
    			<button className="info-button" id="infoButton">About PTWA</button>
					<form>
	    			<input 
	    				className="input" 
	    				id="filterInput" 
	    				name="search" 
	    				placeholder="Search for places in Port Townsend" 
	    				title="search"
	    				type="text"
	    				aria-labelledby="aria-input-description"
	    				onChange={(event) => this.filterVenues(event.target.value)}
	    			/>
	    			<label id="aria-input-description" className="hide-element">Search for places in Port Townsend</label>
	    		</form>
    		</div>

    		<div className="venues-list" id="venuesList">
    			<ul className="venue-list">
						{filtered.map((venueItem) => {
							return (
								<li key={venueItem.venue.id} className="list-item">
									<VenueCard 
										venueDetails={venueItem}
                    markers={this.props.markers}
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
