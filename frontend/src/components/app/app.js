import React from 'react';
// import logo from './logo.svg';
import AppView from '../app_view.js';
import AppNavbar from '../app_navbar.js';
import ViewMap from '../../components/map/map.js';
import ViewFlights from '../../views/view_flight.js';
import ViewGraph from '../../views/view_graph.js';

import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.constructViewMap();

    this.flightsIds = null;
    this.state = {
      view: AppView.FLIGHTS
    }
  }

  constructViewMap() {
    const viewFlights = () => <ViewFlights 
      onFlightsSelected={this.handleFlightsSelected.bind(this)} />;

    const viewFlightMap = () => <ViewMap
        flightsIds={this.flightsIds}
        onBackClick={this.handleMapBackClick.bind(this)} />;

    const viewGraphStats = () => <ViewGraph
        flightsIds={this.flightsIds} />

    this.viewMap = AppView.Map(this);
    this.viewMap.addView(AppView.FLIGHTS, viewFlights);
    this.viewMap.addView(AppView.MAP, viewFlightMap);
    this.viewMap.addView(AppView.ANALYSIS, viewGraphStats);

  }

  handleFlightsSelected(flightsIds) {
    this.flightsIds = flightsIds;
    // this.setState({
    //   view: AppView.ANALYSIS});
  }

  handleMapBackClick() {
    this.setState({
      view: AppView.FLIGHTS});
  }

  handleNavbar(viewId) {
    this.setState({
      view: viewId});
  }

  render() {
    const view = this.viewMap.renderView(this.state.view);

    return (
      <React.Fragment>
        <AppNavbar onNavbar={this.handleNavbar.bind(this)}/>
        {view}
      </React.Fragment>
    );
  }
}

export default App;
