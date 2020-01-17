import React from 'react';
import Map from './map.js'
import Button from '../items/button.js';

class MapUi extends React.Component {
  render() {

    return (
      <div>
        
        <Map
          flight_id={this.props.flight_id}
        />

        <Button onClick={this.props.onBackClick}>
          Back
        </Button>

      </div>
    )
  }
}

export default MapUi;