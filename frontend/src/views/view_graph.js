import React from 'react';
import styled from 'styled-components';
import Config from '../config.js';
import ViewBase from './view_base.js';
import { GraphStatsRanges } from '../components/graphs/graph_diameter_calculated.js';
import { GraphMediana } from '../components/graphs/graph_diameter_calculated.js';

class ViewGraphStats extends ViewBase {
  componentDidMount() {
    
    const flightsIds = this.props.flightsIds;
    this.fetchUrl(Config.url.flightAnalysis(flightsIds.join('/')))
    .then(
      json => this.setState({analysis:json})
    );
  }

  renderGridGraph(analysis) {
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

    const graphs = this.renderGraphs(analysis);

    const gridedGraphs = graphs.map((graph) => {
      return (
        <Grid>
          {graph}
        </Grid>
      )
    })

    return(
      <React.Fragment>
        {gridedGraphs}
      </React.Fragment>
    )
  }

  renderGraphs(analysis) {
    var index = 0;
    
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

    return props_processed.map((prop) => {
      const title = analysis.labels.properties.display_texts[index];
      
      const labels = ((stat) => {
        const sub_title = analysis.labels[stat].info;
        var tmp = analysis.labels[stat][prop];
        tmp.title = title;
        tmp.sub_title = sub_title;
        return tmp;
      });

      const values = ((stat) => analysis[stat][prop].values);

      index += 1;
      

      const  graph_style = graph_styles.get()
      return (
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
      });
  }

  renderReady() {
    const analysis = this.state.analysis;
    const graphs = this.renderGridGraph(analysis);

    return (
      <React.Fragment>
          {graphs}
      </React.Fragment>
    )
  }
}

export default ViewGraphStats;