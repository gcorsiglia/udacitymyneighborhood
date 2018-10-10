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
      markers: [],
      sidebarIsOpen: true
    }
  }
  
  newVenues = (venues) => {
    this.setState({ venues });
  }

  addMarker = (marker) => {
    this.state.markers.push(marker);
  }

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
            displaySidebar={displaySidebar}
            toggleSidebar={this.toggleSidebar}
          />
          
          <MapContainer
            venues={this.state.venues}
            markers={this.state.markers}
            newVenues={this.newVenues}
            addMarker={this.addMarker}
          />
        </main>
        
        <footer className="footer">
          <div className="footer-right">
            <p>ATTRIBUTIONS</p>
            <p>Map created with <a href="https://cloud.google.com/maps-platform/">Google Maps API</a> and 
              places data fetched with the <a href="https://developer.foursquare.com/">Foursquare API</a>.</p>
          </div>

          <div className="footer-left">
            <p>PORT TOWNSEND PLACES</p>
            <p>© 2018 Gina L. Corsiglia</p>
          </div>
        </footer>
      </div> 
    );
  }
}

export default App;
