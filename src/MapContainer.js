import React, { Component } from 'react';

class MapContainer extends Component {
  
  // Get venues based on query
  componentDidMount() {
    this.getVenues();
  }
  
  // Get venues with Foursquare API 
  getVenues = () => {
    
    // Set search param
    const endpoint = new URL('https://api.foursquare.com/v2/venues/explore?')
    const params = {
      client_id: 'D44WA1DU2RWYEEAKMRPLLYUX22001UY3EU3MQ1ZEADN433ZK',
      client_secret: '3WK2RKHNWYOPX5CLRFRUFWTLY5Y31A2Q3EIXE1ES1EXDTFAK',
      v: '20180323',
      near: 'Port Townsend, WA'
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
        .catch(error => {
          console.log('Foursquare API error! ', error);
          alert('Foursquare failed to load. Please refresh the page.')
        });
  }

  initMap = () => {
    // Create map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: this.props.venues[0].venue.location.lat, lng: this.props.venues[0].venue.location.lng },
      zoom: 12
    });

    const infowindow = new window.google.maps.InfoWindow();
    
    // Create marker and infowindow for each item in venues list
    this.props.venues.forEach(venueItem => {
      
      const contentString = 
        `<div class="iw-venue-details-content" tabIndex="0">
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
        id: venueItem.venue.id,
        animation: window.google.maps.Animation.DROP
      });

      marker.addListener('click', () => {
        // Marker animation
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
        setTimeout(() => { marker.setAnimation(null) }, 1750);
        
        infowindow.setContent(contentString);
        map.setZoom(15);
        map.setCenter(marker.position);
        infowindow.open(map, marker);
        map.panBy(0, -125);
      });

      this.props.addMarker(marker);
    });
    
    // Close infowindow when map clicked
    map.addListener('click', () => {
      infowindow.close();
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
        <div id="map" role="application" aria-labelledby="aria-map-description" tabIndex="-1"></div>

        <label id="aria-map-description" className="hide-element">Google Maps application showing places in Port Townsend, WA</label>
      </section>
    )
  }
}

export default MapContainer;