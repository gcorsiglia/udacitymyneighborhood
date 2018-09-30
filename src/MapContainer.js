import React, { Component } from 'react';

class MapContainer extends Component {

  componentDidMount() {      
      // Asynchronously load the Google Maps script
      loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAV1AdfYz-I6GLGa5tFsJV3mpnc8pVeiVY&callback=initMap');

      // Connect initMap() to global window context so Maps API can evoke it
      window.initMap = this.initMap;
  }

  initMap() {
    // Create map with props from parent
    new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.115501, lng: -122.775156},
      zoom: 13
    });
  }

  render() {
    return (
      <div id="map"></div>
    )
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

export default MapContainer;