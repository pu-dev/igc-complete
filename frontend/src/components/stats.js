import React from 'react';
// import Config from '../../config.js'


import styled from 'styled-components';

const TmpItem = styled.button`
  color: palevioletred;
  font-size: 0.75em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;


class StatRange extends React.Component {
  render() {
    const range = this.props.range;
    const rangeItems = Object.keys(range).map((key, index) =>
        <TmpItem>
          {key} : {range[key]}
        </TmpItem>
    );
    return (
      <div>
        {rangeItems}
      </div>
    )
  }


}

class StatRanges extends React.Component {

  render() {
    const ranges = this.props.ranges;
    const rangesItem = ranges.map((range) => (
      <StatRange
        range={range}
      />
    ));

    return (
      <div>
        {rangesItem}
      </div>
    )
  }

}


/**
 * Renders single item of: min, max, average ...
 */
class StatItem extends React.Component {

  render() {
    const title = this.props.title;
    const value = this.props.value;

    return <TmpItem>{title} = {value}</TmpItem>
  }
}


/**
 * Renders all: min, max, average, total, count...
 */
class StatProperty extends React.Component {

  render() {
    const property = this.props.property;
    const propertyName = this.props.propertyName;

    // Ranges need to be handle differently
    delete property['ranges']

    // Goes through: min, max, average...
    const statsProperties = Object.keys(property).map((key, index) => {
      return <StatItem
        title={key}
        value={property[key]}
        key={index}
      />
    });

    return (
      <React.Fragment>
        <div>
          {propertyName}
          {statsProperties}
        </div>
      </React.Fragment>
    )
  }
}


/**
* Renders all: diameter_calculated, height_delta, vario_average....
*/

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const stats = this.props.stats;

    // Goes through: distance_max, distance_calculated, vario_average...
    const statsProperties = Object.keys(stats).map((key, index) => {
      return (
        <React.Fragment>
          <StatProperty
            property={stats[key]}
            propertyName={key}
            key={index}
          />

          <StatRanges
            ranges={stats[key].ranges}
            key={index + 1000}
          />
        </React.Fragment>
      )}
    );



    return (
      <React.Fragment>
        <div>
          {statsProperties}
        </div>

      </React.Fragment>
    )
  }

}

export default Stats;
