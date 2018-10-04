import React, { Component } from 'react';

class VenueCard extends Component {

	constructor(props) {
    super(props);
  }
	
	getStreetviewImage = (venue) => {
    
    /*
     return `https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.props.venueDetails.location.lat},${this.props.venueDetails.location.lng}&key=AIzaSyAV1AdfYz-I6GLGa5tFsJV3mpnc8pVeiVY&signature=G4raxM-9zMlOmmrCaHJNlPCSNSI=` */

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
  
  /*
  getPhotos = () => {
    
		const photoUrl = `https://api.foursquare.com/v2/venues/${this.props.venueDetails.venue.id}/photos?client_id=D44WA1DU2RWYEEAKMRPLLYUX22001UY3EU3MQ1ZEADN433ZK&client_secret=3WK2RKHNWYOPX5CLRFRUFWTLY5Y31A2Q3EIXE1ES1EXDTFAK&v=20181003`;
    
    fetch(photoUrl)
      .then(response => response.json())
        // Set state with response data
        .then(data => {

          const prefix = data.response.photos.items[0].prefix;

          const suffix = data.response.photos.items[0].suffix;

          return prefix, suffix
        })
        .catch(error => console.log('Foursquare API error! ', error));
		
		return (prefix + 'cap300' + suffix)

  } */



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
