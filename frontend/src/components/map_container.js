import React from 'react';
import styled from 'styled-components';


class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: window.innerWidth, 
      height: window.innerHeight 
    };

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
      this.props.onSizeChange();
    }
  }

  updateWrapperSize() {
    this.setState({ 
      width: window.innerWidth, 
      height: window.innerHeight 
    });
  }

  render() {
    const Wrapper = styled.div`
      width: 100%;
      height: ${this.state.height-110}px;
    `;

    return <Wrapper id="map" />
  }
}

export default MapContainer;