import React, { Component } from 'react';
import VenueCard from './VenueCard';

class SideBar extends Component {

	constructor(props) {
    super(props);
  }

  render() {
		
    return (

    	<section id="sidebar" className="sidebar">
    		<div className="sidebar-upper">
    			<button className="info-button" id="infoButton">About PTWA</button>

    			<input 
    				class="input" 
    				id="filterInput" 
    				name="filter" 
    				placeholder="Search for places in Port Townsend" 
    				title="Filter" 
    				type="text"
    				aria-labelledby="aria-input-description"
    			/>
    			<label className="hide-element" id="aria-input-description">Search for places in Port Townsend</label>
    		</div>

    		<div className="venues-list" id="venuesList">
    			<ul>
						{
							this.props.venues.map((venueItem) => {
								return (
									<li id={venueItem.venue.id}>
										<VenueCard 
											venue={venueItem}
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
