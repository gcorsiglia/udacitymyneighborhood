import React, { Component } from 'react';

class VenueCard extends Component {
	
	// Get street view image
	getStreetviewImage = (venue) => {
    
    const baseStreetview = 'https://maps.googleapis.com/maps/api/streetview?'
    
    const params = {
      size: '200x200',
      location: `${this.props.venueDetails.venue.location.lat},${this.props.venueDetails.venue.location.lng}`,
      key: 'AIzaSyAV1AdfYz-I6GLGa5tFsJV3mpnc8pVeiVY',
      pitch: '-0.76',
      fov: '75', 
      radius: '200'
    }
    
    // Convert params into URL
    const searchParams = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');

    return (baseStreetview + searchParams);
  }
  
  render() {
		
		const { venueDetails } = this.props;

    return (
    	<div className="venue-card">
    		<h2 className="vc-name">{venueDetails.venue.name}</h2>
    		<p className="vc-address">{venueDetails.venue.location.formattedAddress[0]}</p>
        <p className="vc-address">{venueDetails.venue.location.formattedAddress[1]}</p>
        <div className="vc-details-body">
          <p>{venueDetails.venue.categories[0].name}</p>
          <img 
          	src={this.getStreetviewImage(venueDetails)}
          	alt={venueDetails.venue.name}
          />
        </div>	
      </div>
    );
  }
}

export default VenueCard;
