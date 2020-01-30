import React from 'react';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import AppView from './app_view.js';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import Button from 'react-bootstrap/Button';



const MapMenu = ({onClick, flights, onNavbar}) => {
  const handleClick = (actionKey, flight) => {
    console.log(actionKey, flight);
    onClick(actionKey, flight);
  }

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

  return (
    <Navbar 
      fixed="bottom"
      bg="dark" 
      variant="dark"
      expand="sm" 
    >

      <ButtonToolbar>
        {items}
      </ButtonToolbar>
    </Navbar>
  )
}

class MapMenuFlightItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: true,
    }

    this.buttonVariant = {
      disabled: "outline-success",
      enabled: "success"
    }
  }

  getButtonVariant() {
    return this.state.enabled ? this.buttonVariant.enabled : this.buttonVariant.disabled;
  }

  splitButtonHandler(actionKey, flight) {
    this.props.onClick('bong', flight);

    this.setState({
      enabled: ! this.state.enabled
    });
  }

  render() {
    const onClick = this.props.onClick;
    const onMainButtonClick = this.splitButtonHandler.bind(this);

    const flight = this.props.flight;
    const index = this.props.index;
    const variant = this.getButtonVariant();
    const enabled = this.state.enabled;

    // Fixme:
    // Optimization
    const ButtonS = styled(Button)`
      margin-right: 3px;
    `;

    const DropdownButtonS = styled(DropdownButton)`
      margin-right: 20px;
    `;

    return(
      <React.Fragment>
        <ButtonS
          size="sm"
          variant={this.buttonVariant.enabled}
          onClick={(e) => {onMainButtonClick(e, flight)}}
        >
          {flight.pilot}
        </ButtonS>
        <DropdownButtonS
          id={index}
          drop="up"
          variant={variant}
          size="sm"
          title={''}
          disabled={! enabled}
          >

          <Dropdown.Item 
            onSelect={(key)=>{onClick(key, flight)}}
            eventKey="track_toggle_visible">Show</Dropdown.Item>

          <Dropdown.Item eventKey="2">Circle</Dropdown.Item>
        </DropdownButtonS>
      </React.Fragment>
    );
  }
}

export default MapMenu;
