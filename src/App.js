import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import HeaderNav from './HeaderNav';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      venues: [], 
      sidebarIsOpen: false,
      query: '',
      markers: []
    }
  }
  
  // Update venues list from props
  newVenues = (venues) => {
    this.setState({ venues });
  }

  // Push new marker to state from props
  addMarker = (marker) => {
    this.state.markers.push(marker);
  }

  render() {
    return (
      <div className="App">
        <HeaderNav />

        <main className="main">
          <MapContainer
            venues={this.state.venues}
            query={this.state.query}
            newVenues={this.newVenues}
            addMarker={this.addMarker}
          />
        </main>
    </div> 

    );
  }
}

export default App;
