import React, { Component } from 'react';
import VenueCard from './VenueCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SideBar extends Component {

	constructor(props) {
    super(props);

    this.state = {
      inputValue: ''
    }
		
		this.handleType = this.handleType.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
  }
	
  handleType = (e) => {
  	this.setState({ inputValue: e.target.value });

  	this.props.filter(this.state.inputValue);
  }
	
	// Send inputValue state to app
  handleSearch = (e) => {
		e.preventDefault();
  	
  	
  }
	
  render() {
		
    return (

    	<section id="sidebar" className="sidebar" style={{ display: this.props.displaySidebar }}>
    		<div className="sidebar-upper">
    			
    			<button className="info-button" id="infoButton">About PTWA</button>
					<form onSubmit={this.handleSearch}>
	    			<input 
	    				className="input" 
	    				id="filterInput" 
	    				name="filter" 
	    				placeholder="Search for places in Port Townsend" 
	    				title="Filter"
	    				type="text"
	    				aria-labelledby="aria-input-description"
	    				onChange={this.handleType}
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
						{
							this.props.venues.map((venueItem) => {
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
