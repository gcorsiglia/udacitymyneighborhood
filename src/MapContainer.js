import React, { Component } from 'react';

class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      markers: []
    }
  }

  componentDidMount() {
    this.getVenues();
  }
  
  // Get venues with Foursquare API 
  getVenues = () => {
    
    // Set search param
    const endpoint = new URL('https://api.foursquare.com/v2/venues/explore?'),
      params = {
        client_id: 'D44WA1DU2RWYEEAKMRPLLYUX22001UY3EU3MQ1ZEADN433ZK',
        client_secret: '3WK2RKHNWYOPX5CLRFRUFWTLY5Y31A2Q3EIXE1ES1EXDTFAK',
        v: '20180323',
        near: 'Port Townsend, WA',
        query: 'food'
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
        .catch(error => console.log(error));
  }

  initMap = () => {
    // Create map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.115501, lng: -122.775156},
      zoom: 13
    });

    const infowindow = new window.google.maps.InfoWindow();
    
    // Infowindow content and markers
    this.props.venues.forEach(venueItem => {
      const contentString = `<div class="venue-details-content" id="venueContent">
        <h2 class="venue-name" id="venueName">${venueItem.venue.name}</h2>
        <p class="venue-address">${venueItem.venue.location.formattedAddress[0]}</p>
        <p class="venue-address">${venueItem.venue.location.formattedAddress[1]}</p>
        <div class="venue-details-body">
          <p>${venueItem.venue.categories[0].name}</p>
        </div>

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
      // Call loadScript to insert src link
      this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAV1AdfYz-I6GLGa5tFsJV3mpnc8pVeiVY&callback=initMap');
    } else {
      this.initMap()
    }
  }

  render() {
    return (
      <div role="application" id="map"></div>
    )
  }
}

export default MapContainer;