import React, { Component } from 'react';
import './App.css';

import MapContainer from './MapContainer';
import HeaderNav from './HeaderNav';
import SideBar from './SideBar';

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch, faBars, faTimes);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      venues: [], 
      sidebarIsOpen: false,
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
  
  /*
  // Update query state with props from child
  filterQuery = (input) => {
    this.setState({ query: input });
  }
  */

  toggleSidebar = () => {
    this.setState((prevState) => {
      return { sidebarIsOpen: !prevState.sidebarIsOpen }
    })
  }

  render() {
    
    let displaySidebar = this.state.sidebarIsOpen ? "block" : "none";

    return (
      <div className="App">
        <HeaderNav 
          sidebarIsOpen={this.state.sidebarIsOpen}
          toggleSidebar={this.toggleSidebar}
        />

        <main className="main">
          <SideBar
            venues={this.state.venues}
            markers={this.state.markers}
            filter={this.filterQuery}
            displaySidebar={displaySidebar}
            filterQuery={this.filterQuery}
          />
          
          <MapContainer
            venues={this.state.venues}
            markers={this.state.markers}
            newVenues={this.newVenues}
            addMarker={this.addMarker}
          />
        </main>
        <footer className="footer">
          <p>PT PLACES</p>
          <p>© 2018 Gina L. Corsiglia</p>
          
        </footer>
    </div> 

    );
  }
}

export default App;
