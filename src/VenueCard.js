import React, { Component } from 'react';

class VenueCard extends Component {
	
	// Get street view image
	getStreetviewImage = (venue) => {
    
    const baseStreetview = 'https://maps.googleapis.com/maps/api/streetview?'
    
    const params = {
      size: '268x150',
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

  handleClick = (id) => {
    let matchingMarker = this.props.markers.find(marker => marker.id === id);

    window.google.maps.event.trigger(matchingMarker, 'click');

    if(window.innerWidth < 769) {
      this.props.toggleSidebar();
    }
  }
  
  render() {
		
		const { venueDetails } = this.props;

    return (
    	<div className="venue-card box-shadow">
    		<h2 className="vc-name" tabindex="0">
          <a onClick={() => {this.handleClick(venueDetails.venue.id)}}>
            {venueDetails.venue.name}</a>
        </h2>
    		
    		<p className="vc-category">{venueDetails.venue.categories[0].name}</p>
    		
				<div className="vc-image-container">
	    		<img 
	        	src={this.getStreetviewImage(venueDetails)}
	         	alt={venueDetails.venue.name}
	         	className="vc-image"
	         />
    		</div>
					
					<div className="vc-address">
	    			<p className="vc-address-street">{venueDetails.venue.location.formattedAddress[0]}</p>
	        	<p>{venueDetails.venue.location.formattedAddress[1]}</p>
	        </div>
	        
	        <p>Who's here: {venueDetails.venue.hereNow.summary}</p>	
      </div>
    );
  }
}

export default VenueCard;
