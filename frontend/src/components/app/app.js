import React from 'react';
// import logo from './logo.svg';
import AppView from '../app_view.js';
import AppNavbar from '../app_navbar.js';
import ViewMap from '../../components/map/map.js';
import ViewFlights from '../../views/view_flight.js';
import ViewGraph from '../../views/view_graph.js';
import Warning from '../modal.js';

import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.constructViewMap();

    this.flightsIds = null;
    this.state = {
      view: AppView.FLIGHTS,
      show_warning:false,
    }


  }

  constructViewMap() {
    const viewFlights = () => <ViewFlights 
      onFlightsSelected={this.handleFlightsSelected.bind(this)} />;

    const viewFlightMap = () => <ViewMap
        flightsIds={this.flightsIds} />;

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

  isFlightsIdsSet() {
    if ( ! this.flightsIds ) {
      return false;
    }

    if ( this.flightsIds.length == 0 ) {
      return false;
    }

    return true;
  }
 
  handleNavbar(viewId) {
    if (viewId != this.FLIGHTS) {
      if ( ! this.isFlightsIdsSet() ) {

        this.warning = {
          'title' : 'Flights not selected',
          'msg' : 'Select flights first.'
        }
        this.setState({show_warning:true});
        return;
      }
    }

    this.setState({
      view: viewId
    });
  }

  handleWarning() {
    this.setState({show_warning: false});
  }

  renderWarning() {
    if (this.state.show_warning) {
      return <Warning 
        onClose={this.handleWarning.bind(this)}
        title={this.warning.title}
        msg={this.warning.msg}
      />;
    }

    return null;
  }

  render() {
    const view = this.viewMap.renderView(this.state.view);
    const warning = this.renderWarning();

    return (
      <React.Fragment>
        <AppNavbar onNavbar={this.handleNavbar.bind(this)}/>
        {view}
        {warning}
      </React.Fragment>
    );
  }
}

export default App;
