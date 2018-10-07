import React, { Component } from 'react';

class MapContainer extends Component {
  
  // Get venues based on query
  componentDidMount() {
    this.getVenues(this.props.query);
  }
  
  // Update venues with new query
  componentDidUpdate(prev) {
    if (prev.query !== this.props.query) {
      this.getVenues(this.props.query);
    }
  }

  // Get venues with Foursquare API 
  getVenues = (query) => {
    
    // Set search param
    const endpoint = new URL('https://api.foursquare.com/v2/venues/explore?')
    const params = {
      client_id: 'D44WA1DU2RWYEEAKMRPLLYUX22001UY3EU3MQ1ZEADN433ZK',
      client_secret: '3WK2RKHNWYOPX5CLRFRUFWTLY5Y31A2Q3EIXE1ES1EXDTFAK',
      v: '20180323',
      near: 'Port Townsend, WA',
      query: query
    }
    
    // Convert params into URL for Fetch API
    Object.keys(params)
      .forEach(key => endpoint.searchParams.append(key, params[key]));
    
    // Fetch Foursquare data
    fetch(endpoint)
      .then(response => response.json())
        // Set state with response data
        .then(data => {
          const results = data.response.groups[0].items;
          
          this.props.newVenues(results);
          
          this.setState({
            venues: results
          }, this.renderMap()) // Render map only after venues are loaded
        })
        .catch(error => console.log('Foursquare API error! ', error));
  }

  initMap = () => {
    // Create map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.115501, lng: -122.775156},
      zoom: 13
    });

    const infowindow = new window.google.maps.InfoWindow();
    
    // Create marker and infowindow for each item in venues list
    this.props.venues.forEach(venueItem => {
      
      const contentString = 
        `<div class="iw-venue-details-content">
          <h3 class="iw-venue-name">${venueItem.venue.name}</h3>
          <p class="iw-venue-address">${venueItem.venue.location.formattedAddress[0]}</p>
          <p class="iw-venue-address">${venueItem.venue.location.formattedAddress[1]}</p>
        </div>`

      const marker = new window.google.maps.Marker({
        position: {
          lat: venueItem.venue.location.lat, 
          lng: venueItem.venue.location.lng
        },
        map: map,
        title: venueItem.venue.name,
        id: venueItem.venue.id
      })

      marker.addListener('click', () => {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      })

      this.props.addMarker(marker);
    });   
  }

  // Insert Google Maps API script into DOM
  loadScript = (url) => {
    const index = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    
    if (typeof google === 'undefined') {
      script.src = url;
      script.async = true;
      script.defer = true;
      index.parentNode.insertBefore(script, index);

      // Connect initMap() to global window so Google Maps API can use it
      window.initMap = this.initMap;
    } 
  }

  renderMap = () => {
    if (typeof google === 'undefined') {
      this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAV1AdfYz-I6GLGa5tFsJV3mpnc8pVeiVY&callback=initMap');
    } else {
      this.initMap()
    }
  }

  render() {
    return (
      <section id="mapContainer">
        <div id="map" role="application" aria-labelledby="aria-map-description"></div>

        <label id="aria-map-description" className="hide-element">Google Maps application</label>
      </section>
    )
  }
}

export default MapContainer;