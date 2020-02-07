import React from 'react';
import styled from 'styled-components';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import AppView from './app_view.js';
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
// import SplitButton from 'react-bootstrap/SplitButton';
// import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import SideMenu from './side_menu.js';


class MapMenu extends React.Component {
  render() {
    const onClick = this.props.onClick;
    // const onNavbar = this.props.onNavbar;

    const handleClick = (actionKey, flight) => {
      onClick(actionKey, flight);
    }

    const flights = this.props.flights;
    const items = flights.map((flight, index) => {

      return (
        <MapMenuFlightItem 
          flight={flight} 
          key={index}
          index={index}
          onClick={handleClick}
        />
      )
    });


    const Container = styled.div`
      height: 100%;
      width: 100%;
      position: fixed;
      pointer-events: none;
      z-index: 1000;
      top: 65px;
      left: 10px;
      transition: 0.5s;
    `;

    const DropdownButtonS = styled(DropdownButton)`
      pointer-events: auto;
      outline:0;
      width: 0px;
      height: auto;

      margin: 0px;
      padding: 0px;
    `;

    return (
      <Container>
        <DropdownButtonS variant="primary" title="Flights" drop="right">
          <ButtonGroup vertical>
            {items}
          </ButtonGroup>
        </DropdownButtonS>
      </Container>
    );
  }
}


class MapMenuFlightItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: true,
    }

    // this.buttonVariant = {
    //   disabled: "outline-secondary",
    //   enabled: "success"
    // }
  }

  // getButtonVariant() {
  //   return this.state.enabled ? this.buttonVariant.enabled : this.buttonVariant.disabled;
  // }

  // getButtonVariant2() {
  //   return this.state.enabled ? this.buttonVariant.enabled : "light";
  // }


  // splitButtonHandler(actionKey, flight) {
  //   this.props.onClick('track_toggle_visible', flight);

  //   this.setState({
  //     enabled: ! this.state.enabled
  //   });
  // }

  render() {
    const onClick = this.props.onClick;
    // const onMainButtonClick = this.splitButtonHandler.bind(this);

    const flight = this.props.flight;
    // const index = this.props.index;
    // const variant = this.getButtonVariant();
    // const enabled = this.state.enabled;

    const DivS = styled.div`
      display: inline;
    `;

    const Pilot = styled.div`
      display: inline;
      padding-right: 10px;
      float: left;
    `;

    const FlightDate = styled.div`
      display: inline;
      position: relative;
      float: left;
      top: 0px;
      display: inline;
      padding-right: 0px;
      font-size: 0.65rem;
    `


    return(
      <DropdownButton 
        variant="light"
        as={ButtonGroup} 
        title={
          <DivS>
            <Pilot>{flight.pilot}</Pilot>
            <FlightDate>{flight.date}</FlightDate>
          </DivS>}
        drop="right"
      > 
        
      <Dropdown.Item 
        onSelect={(key)=>{onClick(key, flight)}}
        eventKey="track_toggle_visible">
        Toggle track
      </Dropdown.Item>

      <Dropdown.Item 
        onSelect={(key)=>{onClick(key, flight)}}
        eventKey="circles_toggle_visible">
        Toggle circles
      </Dropdown.Item>
     </DropdownButton>
    )
  }
}

export default MapMenu;
