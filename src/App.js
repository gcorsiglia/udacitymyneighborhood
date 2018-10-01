import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import HeaderNav from './HeaderNav';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      venues: []
    }
  }

  componentDidMount() {
    // Load Google Maps Script after component mounts
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAV1AdfYz-I6GLGa5tFsJV3mpnc8pVeiVY&callback=initMap');

    // Connect initMap() to global window so Maps API can use it
    window.initMap = this.initMap;

    this.getVenues();
  }

  initMap() {
    // Create map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.115501, lng: -122.775156},
      zoom: 13
    });

    // Create markers
    this.state.venues.map(venueItem => {
      let marker = new window.google.maps.Marker({
        position: {
          lat: venueItem.venue.location.lat, 
          lng: venueItem.venue.location.lng
        },
        map: map
      })
    })  
  }

  // Get venues with Foursquare API 
  getVenues() {
    
    // Set search param
    const endpoint = new URL('https://api.foursquare.com/v2/venues/explore?'),
      params = {
        client_id: 'D44WA1DU2RWYEEAKMRPLLYUX22001UY3EU3MQ1ZEADN433ZK',
        client_secret: '3WK2RKHNWYOPX5CLRFRUFWTLY5Y31A2Q3EIXE1ES1EXDTFAK',
        v: '20180323',
        near: 'Port Townsend, WA',
        query: 'food'
    }
    
    // Convert param into URL for Fetch API
    Object.keys(params)
      .forEach(key => endpoint.searchParams.append(key, params[key]));
    
    // Fetch Foursquare data
    fetch(endpoint)
      .then(response => response.json())
        // Set state with response data
        .then(data => {
          const results = data.response.groups[0].items;

          this.setState({
            venues: results
          })
        })
        .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <HeaderNav />

        <main className="main">
          <MapContainer />
        </main>
    </div> 

    );
  }
}

function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
