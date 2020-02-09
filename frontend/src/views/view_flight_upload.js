import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import Config from '../config.js';
import Spinner from '../components/items/spinner.js';
import ViewBase from './view_base.js';


class ViewFlightUpload extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false
    };
  }

  componentDidMount() {
    this.setState({renderReady: true});
  }

  uploadFile(file) {
    const url= Config.url.flightUpload();
  
    const uploadPromis = fetch(url, {
      method: 'POST',
      body: file,
    })
    .then(response => response.json())
    .then(flight => {
      this.setState({
        uploading:false
      });
      this.props.onFlightUploaded(flight.id)
      return flight;
    })
    .catch(function(error) {
      this.setState({
        uploading:false
      });
      console.error('Error while feching notes: ', error)
    });

    return uploadPromis;
  }

  onFileChoosen(event) {
   this.setState({uploading: true});

   const file = event.target.files[0];
   this.uploadFile(file);
  }

  renderReady() {
    if (this.state.uploading) {
      return <Spinner message="Uploading..." />;
    }

    const Container = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top:0;
      bottom: 0;
      left: 0;
      right: 0;
    `;

    return (
      <Container>
        <Form>
          <Form.Group>
            {/* <Form.Label>Upload IGC file</Form.Label> */}
            <Form.Control type="File" onChange={this.onFileChoosen.bind(this)} />
            <Form.Text className="text-muted">
              It is going to be saved in our database.
            </Form.Text>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}


export default ViewFlightUpload;

