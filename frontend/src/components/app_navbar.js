import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AppView from './app_view.js';


const AppNavbar = ({onNavbar, flightsSelected}) => {
  const handleSelect = viewId => {
    onNavbar(viewId);
  }
  flightsSelected = true;
  
  return (
    <Navbar 
      fixed="top"
      bg="dark" 
      variant="dark"
      expand="sm" 
      onSelect={handleSelect}
    >

    <Navbar.Brand href={AppView.FLIGHTS}>
      <img
        src={process.env.PUBLIC_URL + '/img/logo-glider.png'}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="Polish Pilots"
      />
    </Navbar.Brand>

    <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
        
          <NavDropdown title="Flights">
            <NavDropdown.Item href={AppView.FLIGHTS}>Choose flights</NavDropdown.Item>
            <NavDropdown.Item href={AppView.FLIGHT_UPLOAD}>Upload</NavDropdown.Item>
          </NavDropdown>
          {flightsSelected &&
              <React.Fragment>
              <Nav.Link href={AppView.ANALYSIS}>Analysis</Nav.Link>
              <Nav.Link href={AppView.MAP}>Map</Nav.Link>
              </React.Fragment>
          }
          <Nav.Link href={AppView.ABOUT}>About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavbar;
