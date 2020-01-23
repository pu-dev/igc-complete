import React from 'react';
import Config from '../config.js'
// import Button from '../components/items/button.js'

import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import { useState } from 'react';
import styled from 'styled-components';

import { PageCenter } from '../components/items/page_center.js';


class ViewFlights extends React.Component {
  constructor(props) {
    super(props);
    
    this.onCompare = this.onCompare.bind(this);
    this.handleFlightsSelected = this.handleFlightsSelected.bind(this);

    this.state = {
      flights: []
    };
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

  onCompare() {
    this.props.handleCompareFlights(this.flights);
    // console.log(this);
  }

  handleFlightsSelected(ids) {
    this.flights = ids;
  }

  render() {
    const Div = styled.div`
      padding-left: 12rem;
      padding-right: 2rem;
    `;
    
    const flights = this.state.flights;
    return (
      <Div>
        <Button onClick={this.onCompare}>
          Compare
        </Button>
          <FlightsList 
            flights={flights} 
            handleFlightsSelected={this.handleFlightsSelected}
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
    const ToggleButton_ = styled(ToggleButton)`
      maring-bottom: 3330px;
      font-size: 0.75rem;
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
      
      <ToggleButton_ 
        key={flight.id}
        value={flight.id}
        variant={variant(flight.id)}
      >
        <DivPilot>{flight.pilot}</DivPilot>
        <DivDate>{flight.date}</DivDate>
        <DivGliderType>{flight.glider_type}</DivGliderType>
        <DivGliderId>{flight.glider_id}</DivGliderId>
        
      </ToggleButton_>
      
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

export default ViewFlights;
