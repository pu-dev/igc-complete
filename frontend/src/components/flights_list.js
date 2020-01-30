import React from 'react';
import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import styled from 'styled-components';
import './flights_list.css';

function FlightsList({flights, handleFlightsSelected}) {
  const [selected, setSelected] = useState([]);

  const handleChange = (val) => {
    setSelected(val);
    handleFlightsSelected(val);
  }

  // const variant = (id) => {
  //   return selected.includes(id) ? "primary" : "outline-primary";
  // }

  const ToggleButtonS = styled(ToggleButton)`
    font-size: 0.75rem;
  `;

  const ToggleButtonGroupS = styled(ToggleButtonGroup)`
    padding-top:15px;
    padding-bottom:15px;
  `;
  const flightsRender = flights.map((flight) => {
    return (
      <ToggleButtonS
        key={flight.id}
        value={flight.id}
        variant="outline-primary"
        checked
      >
        <div className="flight-pilot">{flight.pilot}</div>
        <div className="flight-date">{flight.date}</div>
        <div className="flight-glider-type">{flight.gliderType}</div>
        <div className="flight-glider-id">{flight.gliderId}</div>
      </ToggleButtonS>
    )
  });

  return (
    <React.Fragment>
      <ToggleButtonGroupS 
        vertical 
        type="checkbox" 
        value={selected} 
        onChange={handleChange}
      >
        {flightsRender}      
      </ToggleButtonGroupS>
    </React.Fragment>
  );
}

export default FlightsList;

// const FlightViewNavBar = ({onCompare}) => {
//   const ButtonToolbarStyled = styled(ButtonToolbar)`
//     margin: 0 auto; 
//     text-align: center;
//     width: 100%;
//     display: inline-block;
//   `;

//   const handleSelect = () => {
//     alert("bong")
//   };

//   return (
//     <Navbar 
//       fixed="bottom"
//       bg="light" 
//       expand="lg" 
//       onSelect={handleSelect}
//     >
//       <ButtonToolbarStyled fixed="bottom" aria-label="Toolbar with button groups">
//         <ButtonGroup className="mr-2" aria-label="First group">
//           <Button onClick={onCompare}>Compare</Button>
//         </ButtonGroup>
//       </ButtonToolbarStyled>

//     </Navbar>
//   )
// };

