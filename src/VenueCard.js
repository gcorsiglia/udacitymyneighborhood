import React, { Component } from 'react';

class VenueCard extends Component {

	constructor(props) {
    super(props);

    this.getStreetviewImage = this.getStreetviewImage.bind(this);
  }
	
	
	getStreetviewImage = (venue) => {
    /*
     return `https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.props.venueDetails.location.lat},${this.props.venueDetails.location.lng}&key=AIzaSyAV1AdfYz-I6GLGa5tFsJV3mpnc8pVeiVY&signature=G4raxM-9zMlOmmrCaHJNlPCSNSI=` */

    const baseStreetview = 'https://maps.googleapis.com/maps/api/streetview?'
    
    const params = {
      size: '200x200',
      location: `${this.props.venueDetails.venue.location.lat}, ${this.props.venueDetails.venue.location.lng}`,
      key: 'AIzaSyAV1AdfYz-I6GLGa5tFsJV3mpnc8pVeiVY'
      // signature: 'Sq48OclybOSukN34G3NXo4UMPK8='
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
          <img src={this.getStreetviewImage(venueDetails)} width="200" height="200" />
        </div>	
      </div>
    );
  }
}

export default VenueCard;
