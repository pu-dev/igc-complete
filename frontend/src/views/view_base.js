import React from 'react';
import Loading from '../components/items/loading.js';
import Config from '../config.js';


class ViewBase extends React.Component {

  fetchGQL(url, query, variables) {
    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        query: `${query}`,
        variables: variables
      })
    })
   .then(response => response.json())
   .then(json => {
      return json;
    })
    .catch(function(error) {
      console.error('Error while feching notes: ', error)
    });
  }

 fetchURL(url) {
    return fetch(url, {
        method: "GET" 
      })
      .then(response => response.json())
      .then((json) => {
        return json;
      })
      .catch(function(error){
        console.error('Error while feching notes: ', error)
      });
  }

  fetchFlights(query, variables) {
    console.info("Fetching flights data. ");
    console.log(variables)
    this.fetchGQL(Config.url.flights(), query, variables)
      .then(json => { 
        this.flightsDidLoad(json.data.flights);
      })
      .catch(function(error) {
        console.error('Error while feching notes: ', error)
      });
  }

  flightsDidLoad(flights) {
    console.log("Flights data loaded.");
    console.log(flights)
    this.setState({flights: flights});
  }

  render() {
    if ((this.state == null) || (this.state.renderReady != true )) {
      return <Loading />;
    }

    return this.renderReady();
  }


  renderReady() {
    throw new Error("Overwrite me!!!");
  }
}

export default ViewBase;