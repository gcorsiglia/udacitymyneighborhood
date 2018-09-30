import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import HeaderNav from './HeaderNav';

class App extends Component {

  render() {
    return (
      <div className="App">
        <HeaderNav />

        <main>
          <MapContainer />
        </main>
    
    </div> 

    );
  }
}

export default App;
