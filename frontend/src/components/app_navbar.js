import React from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AppView from './app_view.js';


const AppNavbar = ({onNavbar}) => {

  const handleSelect = viewId => {
    onNavbar(viewId);
  }

  const handleBrandSelect = () => {
    onNavbar(AppView.FLIGHTS);
  }

  return (
    <Navbar 
      fixed="top"
      bg="dark" 
      variant="dark"
      expand="sm" 
      onSelect={handleSelect}
    >

    <Navbar.Brand>
      <img
        src="http://glide.3o3.it/static/pp-2.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="Polish Pilots"
      />
    </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="mr-auto">
        <Nav.Link href="#flights_list">Flights</Nav.Link>
        <Nav.Link href="#flights_analysis">Analysis</Nav.Link>
        <Nav.Link href="#flights_map">Map</Nav.Link>
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  )
}

export default AppNavbar;
