import React, { Component } from 'react';
import VenueCard from './VenueCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SideBar extends Component {

	constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      filterResults: []
    }
  }

  updateQuery = (query) => {
  	this.setState({ inputValue: query });
  	this.props.filter(this.state.inputValue);
  	this.updateFilterResults(query);
  }

  updateFilterResults = (query) => {
  	if(query) {
  		this.setState({ filterResults })
		} else {
			this.setState({ filterResults: [] })
		}
  }
	
	/*
  handleType = (e) => {
  	this.setState({ inputValue: e.target.value });

  	this.props.filter(this.state.inputValue);
  }

  updateSearchResults(query) {
  	if(query) {
  }


  filterVenues(query) {
    let f = query ? this.venues.filter(v => v.name.toLowerCase().includes(query)) : this.venues;
    this.markers.forEach(m => {
      m.name.toLowerCase().includes(query) ?
      m.setVisible(true) :
      m.setVisible(false);
    });
    this.setState({ filtered: f, query: query });
  }
  */

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
	    				title="Filter"
	    				type="text"
	    				aria-labelledby="aria-input-description"
	    				onChange={(event) => this.updateQuery(event.target.value)}
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
						{this.state.inputValue && this.state.filterResults.map((resultVenue) => {
							return (
								<li key={resultVenue.venue.id} className="list-item">
									<VenueCard 
										venueDetails={resultVenue}
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
