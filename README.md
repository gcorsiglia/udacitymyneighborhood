# My Neighborhood App

For this project, I developed a single-page application using React featuring a map of my town, Port Townsend, WA. I added additional functionality, including: map markers to identify popular locations, a search function to easily discover these locations, and a list view to support simple browsing of all locations. This is the seventh and final project in the [Udacity Front-end Development Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).

This project was bootstrapped with Create React App. The app utilizes Google Maps JavaScript API to render the map, markers, and infowindows; FourSquare API for venue data; and Google Street View API for images.

## How to View the App

* install `node` and `npm`
* clone this repo with git or download and extract via zip
* open terminal and change directory into project root
* install all project dependencies with `npm install`
* start the development server with `npm start`
* navigate to `localhost:3000`

Note: The service worker is implemented only in the production build. To view the app with service worker:

* `npm run build`
* `serve -s build`
* navigate to `localhost:5000`

## Dependencies

* React
* [Create React App](https://github.com/facebookincubator/create-react-app)
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
* [FourSquare API](https://developer.foursquare.com/)
* [Google Street View API](https://developers.google.com/maps/documentation/streetview/intro)
* [Font Awesome Icons](https://fontawesome.com/icons)
* [Google Fonts](https://fonts.google.com/)

## Project Features
* Responsive, mobile-first design
* Accessible
* Offline first
