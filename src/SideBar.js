import React, { Component } from 'react';
import VenueCard from './VenueCard';
import searchImg from './assets/search.png';

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
  }
	
	// Send inputValue state to app
  handleSearch = (e) => {
		e.preventDefault();
  	
  	this.props.filter(this.state.inputValue);
  }
	
	/* This gets passed to each list item
	value={this.props.query} onChange={(e) => { this.props.filterVenues(e.target.value) }} 
	
	This is the main function. Lives in App.js? OR Sidebar?
	filterVenues(query) {
    let f = query ? this.venues.filter(v => v.name.toLowerCase().includes(query)) : this.venues;
    this.markers.forEach(m => {
      m.name.toLowerCase().includes(query) ?
      m.setVisible(true) :
      m.setVisible(false);
    });
    this.setState({ filtered: f, query: query });
  }
	
	This allows for state to be changed via props. Lives in App.js.
  venueTypeFilter = (input) => {
    this.setState({
      filterQuery: input
    })
  }
  */

  render() {
		
    return (

    	<section id="sidebar" className="sidebar">
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

	    			<button className="filter-button" id="filterButton" type="submit" title="filter"><img src={searchImg} width="30" /></button>
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
