import React, { Component } from 'react';

class VenueCard extends Component {

  render() {
		
		const { venueDetails } = this.props;

    return (
    	<div className="venue-card">
    		<h2 className="vc-name">{venueDetails.venue.name}</h2>
    		<p className="vc-address">{venueDetails.venue.location.formattedAddress[0]}</p>
        <p className="vc-address">{venueDetails.venue.location.formattedAddress[1]}</p>
        <div className="vc-details-body">
          <p>{venueDetails.venue.categories[0].name}</p>
        </div>
    		
      </div>
    );
  }
}

export default VenueCard;
