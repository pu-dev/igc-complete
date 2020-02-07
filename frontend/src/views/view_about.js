import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './view_about.css';


/**
* 
* ViewAbout
*
*/

class ViewAbout extends React.Component  {
  render() {

    const cards = [
      {
        title: 'About',
        text: `
        This page analyzes glide tracks and visualise comparison of pilots performance.
        `
      },
      {
        title: 'Technologies used',
        text: 

          <ListGroup>
            <ListGroup.Item><strong>Frontend:</strong> ReactJS</ListGroup.Item>
            <ListGroup.Item><strong>Backend:</strong> Django</ListGroup.Item>
            <ListGroup.Item><strong>Other:</strong> GraphQL (it's awesome!!)</ListGroup.Item>
          </ListGroup>
        
      },
      {
        title: 'Source code',
        text: (
          <React.Fragment>
            Souce code is available on
             <a target="_blank" rel="noopener noreferrer" href="https://github.com/pu-dev/igc-complete"> GitHub
             </a>. Feel free to contribute.
          </React.Fragment>
        )
      },
      { 
        title: `Todo's`,
        text: (
          <ListGroup>
            <ListGroup.Item>
              <strong>Machine learning </strong>
              <hr />
              Implement machine learning to find and categorise patterns in flights.
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Aircraft Proximity analysis</strong>
              <hr />
              An AIRPROX is a situation in which, the distance between airships as well as their relative positions and speed have been such that the safety of the airshiops involved may have been compromised.
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Glide task</strong>
              <hr />
              Add glide task planning and visualisation tool.
            </ListGroup.Item>
          </ListGroup>
        )
      }
    ]

    const cardsRender = cards.map((card, index) => {
      return <AboutItem
        title={card.title}
        text={card.text}
        index={index}
        key={index}
      />
    });
    return (
      <div className="about-container">
      <Accordion defaultActiveKey="0">
        {cardsRender}
      </Accordion>
      </div>
    )
  }
}


/**
* 
* AboutItem
*
*/

const AboutItem = ({title, text, index}) => {
  const variant="outline-primary";

  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle 
          className="about-item-header" 
          as={Button} 
          variant={variant} 
          eventKey={index}
        >
          {title}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={index}>
        <Card.Body className="about-item-text">{text}</Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default ViewAbout;