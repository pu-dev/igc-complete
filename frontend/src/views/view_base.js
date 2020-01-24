import React from 'react';
import Loading from '../components/items/loading.js';


class ViewBase extends React.Component {

 fetchUrl(url) {
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