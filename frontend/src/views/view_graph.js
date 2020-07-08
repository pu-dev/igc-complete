import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Config from '../config.js';
import ViewBase from './view_base.js';
import { GraphStatsRanges } from '../components/graphs/graph_diameter_calculated.js';
import { GraphMediana } from '../components/graphs/graph_diameter_calculated.js';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import StatsMenu from '../components/stats_menu.js';


class ViewGraphStats extends ViewBase {
  componentDidMount() {
    
    const flightsIds = this.props.flightsIds;
    this.fetchURL(Config.url.flightAnalysis(flightsIds.join('/')))
    .then(
      json => this.setState({
        analysis:json,
        renderReady: true
      })
    );
  }

  renderReady() {
    const analysis = this.state.analysis;
    return (
      <React.Fragment>
        <GraphTabs
          analysis={analysis}
        />
      </React.Fragment>
    )
  }
}


/**
*
*
*/

const GraphTabs = ({analysis}) => {
  const [getKey, setKey] = useState('diameter_calculated')

  const graphGroups = GraphGroups(analysis);
  
  const gridedGraphs = graphGroups.map((graphGroup, index) => {
    return (
      <Tab key={index} eventKey={graphGroup.key} title={graphGroup.title}>
        <GraphGrid>
          {graphGroup.render}
        </GraphGrid>
      </Tab>
    );
  });

  return (
    <Tabs variant="tabs" activeKey={getKey} onSelect={key => setKey(key)}>
      {gridedGraphs}
    </Tabs>
  )
}


/**
*
*
*/

class GraphGrid extends React.Component {

  render() {
    const Grid = styled.div`
      display: grid;
      @media (max-width: 1200px) {
        grid-template-columns: 100%;
        grid-template-rows: minmax(300px, 75%);
    
      }
      @media (min-width: 1200px) {
        grid-template-columns: 50% 50%;
        grid-template-rows: minmax(300px, 75%);
      }
      grid-auto-flow: rows;
      grid-auto-rows: 500px;
    `;

    return (
      <Grid>
        {this.props.children}
      </Grid>
    );
  }
}


/**
*
*
*/

const GraphGroups = analysis => {

  const graph_styles = {
    style_1: "primary",
    style_2: "success",
    get: function() {
      this.style = (this.style === this.style_2 ) ? this.style_1 : this.style_2;
      return this.style;
    }
  }

  const keys = analysis.stats_series_keys;
  const props_processed = analysis.labels.properties.names;

  return props_processed.map((prop, index) => {
    const title = analysis.labels.properties.display_texts[index];
    
    const labels = ((stat) => {
      const sub_title = analysis.labels[stat].info;
      var tmp = analysis.labels[stat][prop];

      tmp.title = title;
      tmp.sub_title = sub_title;
      return tmp;
    });

    const values = ((stat) => analysis[stat][prop].values);
    const graph_style = graph_styles.get()

    const render = (
      <React.Fragment>
        <GraphMediana
          keys={keys}
          values={values('stats_mean')}
          labels={labels('stats_mean')}
          style={graph_style}
        />

        <GraphStatsRanges
          keys={keys}
          values={values('stats_ranges_count_weighted')}
          labels={labels('stats_ranges_count_weighted')}
          style={graph_style}
        />

        <GraphStatsRanges
          keys={keys}
          values={values('stats_ranges_count')}
          labels={labels('stats_ranges_count')}
          style={graph_style}
        />

        <GraphStatsRanges
          keys={keys}
          values={values('stats_ranges_mean_value')}
          labels={labels('stats_ranges_mean_value')}
          style={graph_style}
        />
      </React.Fragment>
    );

    return {
      title: title,
      render: render,
      key: prop
    }
  });
}


export default ViewGraphStats;