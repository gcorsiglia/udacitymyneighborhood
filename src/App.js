import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import HeaderNav from './HeaderNav';
import SideBar from './SideBar';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      venues: [], 
      sidebarIsOpen: true,
      query: '',
      markers: []
    }
  }
  
  // Update venues state with props from child
  newVenues = (venues) => {
    this.setState({ venues });
  }

  // Push new marker to state with props from child
  addMarker = (marker) => {
    this.state.markers.push(marker);
  }

  // Update query state with props from child
  filterQuery = (input) => {
    this.setState({ query: input });
  }

  render() {
    
    // Check state of sidebar before rendering
    let sidebar;
    if (this.state.sidebarIsOpen) {
      sidebar = 
        <SideBar
          venues={this.state.venues}
          query={this.state.query}
          markers={this.state.markers}
          filter={this.filterQuery}
        />
    }

    return (
      <div className="App">
        <HeaderNav 
          sidebarIsOpen={this.state.sidebarIsOpen}
        />

        <main className="main">
          {sidebar}
          
          <MapContainer
            venues={this.state.venues}
            query={this.state.query}
            markers={this.state.markers}
            newVenues={this.newVenues}
            addMarker={this.addMarker}
          />
        </main>
    </div> 

    );
  }
}

export default App;
