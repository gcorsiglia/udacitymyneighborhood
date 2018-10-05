import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class HeaderNav extends Component {

  render() {

    let navIcon;
    if (this.props.sidebarIsOpen) {
      navIcon = 
        <FontAwesomeIcon
          icon="times"
          className="icon"
          size="lg"
        />
    } else {
      navIcon = 
        <FontAwesomeIcon
        icon="bars"
        className="icon"
        size="lg"
      />
    }

    return (
      <header className="header">
        <h1 className="title">Port Townsend Places</h1>

        <nav>
          <a onClick={() => { this.props.toggleSidebar() }}>
            {navIcon}
          </a>
        </nav>
      </header>
    );
  }
}

export default HeaderNav;
