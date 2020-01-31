import React from 'react';
import styled from 'styled-components';
import './map_container.css';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.updateWrapperSize = this.updateWrapperSize.bind(this);
  }

  componentDidMount() {
    this.updateWrapperSize();
    window.addEventListener('resize', this.updateWrapperSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWrapperSize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState != this.state) {
      this.updateWrapperSize();
    }
  }

  updateWrapperSize() {
    this.getMapContainer().style.height = `${window.innerHeight -110}px`;
  }
  
  getMapContainer() {
    return document.getElementById("map");
  }

  render() {
    return <div id="map" className="map-wrapper"/>
  }
}

export default MapContainer;