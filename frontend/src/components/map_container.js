import React from 'react';
import './map_container.css';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.updateWrapperSize = this.updateWrapperSize.bind(this);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.updateWrapperSize();
    window.addEventListener('resize', this.updateWrapperSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWrapperSize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.updateWrapperSize();
    }
  }

  updateWrapperSize() {
    this.mapRef.current.style.height = `${window.innerHeight-56}px`;
  }

  render() {
    return <div id="map" ref={this.mapRef} className="map-wrapper"/>
  }
}

export default MapContainer;