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

import SideMenu from './side_menu.js';

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
    <SideMenu 
      width="150px"
    >
      <ButtonToolbar>
        {items}
      </ButtonToolbar>
    </SideMenu>
  )
}

class MapMenuFlightItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: true,
    }

    this.buttonVariant = {
      disabled: "outline-secondary",
      enabled: "success"
    }
  }

  getButtonVariant() {
    return this.state.enabled ? this.buttonVariant.enabled : this.buttonVariant.disabled;
  }

  getButtonVariant2() {
    return this.state.enabled ? this.buttonVariant.enabled : "light";
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
    const DivS = styled.div`
      margin-bottom: 6px;
    `

    
    const ButtonS = styled(Button)`
      margin-left: 10px;
      margin-right: 5px;
      display: inline;
    `;

    const DropdownButtonS = styled(DropdownButton)`
      display: inline;
      margin-right: 10px;
    `;

    return(
      <DivS>
        <ButtonS
          size="sm"
          variant={this.getButtonVariant2()}
          onClick={(e) => {onMainButtonClick(e, flight)}}
        >
          {flight.pilot}
        </ButtonS>
        <DropdownButtonS
          id={index}
          drop="down"
          variant={variant}
          size="sm"
          title=''
          disabled={! enabled}
          >

          <Dropdown.Item 
            onSelect={(key)=>{onClick(key, flight)}}
            eventKey="track_toggle_visible">Show</Dropdown.Item>
        </DropdownButtonS>
      </DivS>
    );
  }
}

export default MapMenu;
