import React from 'react';
import Toast from 'react-bootstrap/Toast'
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Example() {
  const [show, setShow] = useState(true);

  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={30000} autohide>
          <Toast.Header>
            <strong className="mr-auto">ss</strong>
            <small>Houston we have a problem</small>
          </Toast.Header>
          <Toast.Body>Select flights first</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default Example;