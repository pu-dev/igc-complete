import React from 'react';
import './ui.css'

//
// UI
//
class UI extends React.Component {
  render() {

    const flights = this.props.flights;
    const map = this.props.map;

    return (
      <div className="page">
        <div className="map">
          {map}
        </div>
        <div className="flights">
          {flights}
        </div>
      </div>
    );
  }
}

export default UI;