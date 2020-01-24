import React from 'react';
import Config from '../config.js'
// import Button from '../components/items/button.js'

import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import { useState } from 'react';
import styled from 'styled-components';
import ViewBase from './view_base.js';

import Navbar from 'react-bootstrap/Navbar';


class ViewFlights extends ViewBase {
  constructor(props) {
    super(props);
  }

  fetchFlights() {
    fetch(Config.url.flights())
      .then(res => res.json())
      .then((data) => {
          this.setState({flights: data})
      })
      .catch(function(error){
        console.error('Error while feching notes: ', error)
      })
  }

  componentDidMount() {
    this.fetchFlights();
  }

  handleFlightsSelected(ids) {
    this.props.onFlightsSelected(ids);
  }

  renderReady() {
    const Div = styled.div`
      text-align:center;
    `;

    const flights = this.state.flights;
    return (
      <Div>
          <FlightsList 
            flights={flights} 
            handleFlightsSelected={this.handleFlightsSelected.bind(this)}
          />
      </Div>
    )
  }
}


function FlightsList({flights, handleFlightsSelected}) {
  const [selected, setSelected] = useState([]);

  const handleChange = (val) => {
    setSelected(val);
    handleFlightsSelected(val);
  }

  const variant = (id) => {
    return selected.includes(id) ? "primary" : "outline-primary";
  }

  const flightsRender = flights.map((flight) => {
    const ToggleButtonS = styled(ToggleButton)`
      font-size: 0.75rem;
      background-color: white;
    `;

    const DivPilot = styled.div`
      width: 200px;
      display: inline-block;
    `;

    const DivDate = styled.div`
      width: 110px;
      display: inline-block;
    `;

    const DivGliderId = styled.div`
      width: 100px;
      display: inline-block;
    `;
    
    const DivGliderType = styled.div`
      width: 160px;
      display: inline-block;
    `;

    return (
      <ToggleButtonS
        key={flight.id}
        value={flight.id}
        variant={variant(flight.id)}
      >
        <DivPilot>{flight.pilot}</DivPilot>
        <DivDate>{flight.date}</DivDate>
        <DivGliderType>{flight.glider_type}</DivGliderType>
        <DivGliderId>{flight.glider_id}</DivGliderId>
        
      </ToggleButtonS>
      
    )
  });

  return (
    <ToggleButtonGroup 
      vertical 
      type="checkbox" 
      value={selected} 
      onChange={handleChange}
    >
      {flightsRender}      
    </ToggleButtonGroup>
  );
}


const FlightViewNavBar = ({onCompare}) => {
  const ButtonToolbarStyled = styled(ButtonToolbar)`
    margin: 0 auto; 
    text-align: center;
    width: 100%;
    display: inline-block;
  `;

  const handleSelect = () => {
    alert("bong")
  };

  return (
    <Navbar 
      fixed="bottom"
      bg="light" 
      expand="lg" 
      onSelect={handleSelect}
    >
      <ButtonToolbarStyled fixed="bottom" aria-label="Toolbar with button groups">
        <ButtonGroup className="mr-2" aria-label="First group">
          <Button onClick={onCompare}>Compare</Button>
        </ButtonGroup>
      </ButtonToolbarStyled>

    </Navbar>
  )
};


export default ViewFlights;



























