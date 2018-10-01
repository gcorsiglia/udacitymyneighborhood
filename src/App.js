import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import HeaderNav from './HeaderNav';

class App extends Component {

  componentDidMount() {
    this.getVenues();
  }

  getVenues() {
    
    // Get venues with Foursquare API, set search param
    const endpoint = new URL('https://api.foursquare.com/v2/venues/explore?'),
      params = {
        client_id: 'D44WA1DU2RWYEEAKMRPLLYUX22001UY3EU3MQ1ZEADN433ZK',
        client_secret: '3WK2RKHNWYOPX5CLRFRUFWTLY5Y31A2Q3EIXE1ES1EXDTFAK',
        v: '20180323',
        near: 'Port Townsend, WA',
        query: 'food'
    }
    
    // Convert param into URL for fetch API
    Object.keys(params)
      .forEach(key => endpoint.searchParams.append(key, params[key]));
    
    // Fetch Foursquare data
    fetch(endpoint)
      .then(response => response.json())
        .then(data => {
          let venues = [];
          const results = data.response.groups[0].items

          results.forEach(item => {
            let name = item.venue.name;

            console.log(name);
          });

          console.log('Scuccess! ' + results)
        })
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

export default App;
