import React from 'react';
import Loading from '../components/items/loading.js';


class ViewBase extends React.Component {

  fetchGQL(url, query) {
    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ query: `query ${query}` })
    })
   .then(response => response.json())
   .then(json => {
      return json;
    })
    .catch(function(error){
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

  render() {
    if (this.state == null ) {
      return <Loading />;
    }

    return this.renderReady();
  }


  renderReady() {
    throw new Error("Overwrite me!!!");
  }
}

export default ViewBase;