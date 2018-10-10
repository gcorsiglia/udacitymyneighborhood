import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class HeaderNav extends Component {
  
  handleKeyMenu = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      this.props.toggleSidebar();
    }
  }

  render() {

    let navIcon;
    if (this.props.sidebarIsOpen) {
      navIcon = 
        <FontAwesomeIcon
          icon="times"
          className="icon"
          size="lg"
          aria-label="close"
        />
    } else {
      navIcon = 
        <FontAwesomeIcon
        icon="bars"
        className="icon"
        size="lg"
        aria-label="open"
      />
    }

    return (
      <header className="header">
        <h1 className="title">Port Townsend Places</h1>

        <nav 
          tabIndex="0"
          onClick={() => { this.props.toggleSidebar() }}
          onKeyPress={this.handleKeyMenu}
        >
          <button aria-expanded={this.props.sidebarIsOpen} aria-label="menu">
            {navIcon}
          </button>
        </nav>
      </header>
    );
  }
}

export default HeaderNav;
