import React from 'react';


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
}

export default ViewBase;