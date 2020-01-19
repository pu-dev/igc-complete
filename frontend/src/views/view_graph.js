import React from 'react';
import ViewBase from './view_base.js';
import { GraphDiameterCalculated } from '../components/graphs/graph_diameter_calculated.js';
import { GraphDiameterCalculatedStats }from '../components/graphs/graph_diameter_calculated.js';
import { GraphDiameterCalculatedSummary }from '../components/graphs/graph_diameter_calculated.js';

import styled from 'styled-components';
import { ResponsivePie } from '@nivo/pie'

import { ResponsiveBar } from '@nivo/bar'

const Div = styled.div`
    width: 100%;
    height: 450px;
`;

class ViewGraphStats extends ViewBase {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchFlightAnalysis().then(
      json => this.setState({analysis:json})
    );
  }

  render() {
    if (this.state == null ) {
      return <div>Sitting and drawing...</div>
    }

    const circles = this.state.analysis.circles;
    const ranges = this.state.analysis.stats.diameter_calculated.ranges;
    const stats = this.state.analysis.stats.diameter_calculated;
    const summary = [
      {
        'var':'minimum',
        'diameter': stats.min,
      },
      {
        'var':'average',
        'diameter': stats.average,
      },
      {
        'var':'maximum',
        'diameter': stats.max,
      } 
    ]

    return (
      <React.Fragment>
        <Div>
          <GraphDiameterCalculatedSummary data={summary}/>
        </Div>
        <Div>
          <GraphDiameterCalculatedStats data={ranges}/>
        </Div>
        <Div>
          <GraphDiameterCalculated data={circles}/>
        </Div>
      </React.Fragment>
    )
  }
}

export default ViewGraphStats;