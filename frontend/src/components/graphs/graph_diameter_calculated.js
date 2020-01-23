import React from 'react';
import { useState } from 'react';
import { useTheme } from '@nivo/core'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveBarCanvas } from '@nivo/bar'
import styled from 'styled-components';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';


class GraphBase extends React.Component {
  render() {
    const DivGraphHeader = styled.div`
      margin-left:10px;
      margin-right:10px;
      maring-bottom: 0px;

      padding-top: 10px;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 0px;
    `;

    const DivGraph = styled.div`
      height: 450px;
      padding-bottom:90px;
      margin-top: 0px;
    `;

    const labels = this.props.labels;
    const style = this.props.style;

    const graph = this.renderGraph();

    return (
      <div>
        <DivGraphHeader>
          <GraphHeaderRender
            labels={labels}
            style={style}
          />
        </DivGraphHeader>
        <DivGraph>
          {graph}
        </DivGraph>
      </div>
    );
  }
}


export class GraphStatsRanges extends GraphBase {
  renderGraph() {
    const keys = this.props.keys;
    const values = this.props.values;
    const labels = this.props.labels;
    const style = this.props.style;

    return (
      <GraphStatsRangesRender
        keys={keys}
        values={values}
        labels={labels}
        style={style}
      />
    );
  }
}

export class GraphMediana extends GraphBase {
  renderGraph() {
    const keys = this.props.keys;
    const values = this.props.values;
    const labels = this.props.labels;
    const style = this.props.style;

    return (
      <GraphMedianaRender
        keys={keys}
        values={values}
        labels={labels}
        style={style}
      />
    );
  }
}


class GraphStatsRangesRender extends React.Component {
  render() {
    const keys = this.props.keys;
    const values = this.props.values;

    // const CustomTick = tick => {
    //   const theme = useTheme()
    //   const boxWidth = 90;
    //   const boxShadow = 1;
    //   const boxHeight = 15;
      
      
    //   var tickHeight;
    //   var textTransform;
      
    //   const boxTranslateY = 20;

    //   if (counter % 2 == 0) {
    //     tickHeight = 10;
    //     textTransform="translate(0, 15)";
    //   }
    //   else {
    //     tickHeight = 20;
    //     textTransform="translate(0, 35)";
    //   }

    //   counter += 1

    //   return (
    //     <g transform={`translate(${tick.x},${tick.y + 22})`}>
    //       <rect_
    //         transform="rotate(10) translate(0, {{boxTranslateY}})"
    //         x={-(boxWidth+boxShadow)/2} y={-6} rx={3} ry={3} width={boxWidth+boxShadow} height={boxHeight} fill="rgba(0, 0, 0, .05)" />

    //       <rect_
    //         transform="rotate(10) translate(0, {boxTranslateY+5})"
    //         x={-boxWidth/2} y={-12} rx={2} ry={2} width={boxWidth} height={boxHeight} fill="#e9eaef" />

    //       <line 
    //         stroke="#d2d6e2" 
    //         strokeWidth={1.5} 
    //         y1={-22} y2={-22+tickHeight} />
          
    //       <text
    //         transform={textTransform}
    
    //         textAnchor="middle"
    //         dominantBaseline="middle"
    //         style={{
    //           fill: '#333',
    //           fontSize: 10,
    //         }}
    //       >
    //         {tick.value}
    //       </text>
    //     </g>
    //   )
    // };

    // CustomTick.counter = 0;
    const labels = this.props.labels;

    return (
      <ResponsiveBar
        data={values}
        keys={keys}
        margin={{ 
          top: 20, 
          right: 20, 
          bottom: 70, 
          left: 70 
        }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        groupMode='grouped'
        legends ={[ 
          {
            anchor: 'top-left',
            itemWidth: 20,
            itemHeight: 20,
            symbolSize: 20,
            itemsSpacing: 5,
            direction: 'column',
            translateX: 0,
            translateY: 10,
          }
        ]}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 25,
          tickPadding: 5,
          tickRotation: 20,
          legend: labels.x_axis_legend,
          legendPosition: 'middle',
          legendOffset: 10,
          // renderTick: CustomTick,

          // format1: ((index) => {
          //     return 1;
          //   // const item = data[index];

          //   // const range_start = Math.round(item.range_start);
          //   // const range_stop = Math.round(item.range_stop);

          //   // return `${range_start} - ${range_stop}`;
          // })
        }}
        axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: labels.y_axis_legend,
            legendPosition: 'middle',
            legendOffset: -40,
        }}
        layout="vertical"
        enableLabel={true}
        labelSkipWidth={25}
        labelSkipHeight={35}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.6 ] ] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    );
  }
}


class GraphMedianaRender extends React.Component {
  render() {
    const keys = this.props.keys;
    const values = this.props.values;
    const labels = this.props.labels;

    return (
      <ResponsiveBar
        data={values}
        keys={keys}
        margin={{ 
          top: 20, 
          right: 20, 
          bottom: 70, 
          left: 70 
        }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        groupMode='grouped'
        legends ={[ 
          {
            anchor: 'top-left',
            itemWidth: 20,
            itemHeight: 20,
            symbolSize: 20,
            itemsSpacing: 5,
            direction: 'column',
            translateX: 0,
            translateY: 10,
          }
        ]}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 1,
          tickRotation: 0,
          legend: labels.x_axis_legend,
          legendPosition: 'middle',
          legendOffset: 28,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: labels.y_axis_legend,
            legendPosition: 'middle',
            legendOffset: -50,
            format: ((value) => {
              return `${value}m`;
            })
        }}
        layout="vertical"
        enableLabel={true}
        labelSkipWidth={25}
        labelSkipHeight={35}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.6 ] ] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    );
  }
}

const GraphHeaderRender = (({labels, style}) => {
  const InfoBox = styled(Alert)`
    margin-bottom: 0px;
    padding-bottom: 0px;
  `;

  return (
    <React.Fragment>
     <InfoBox variant={style}>
        <GraphHeaderBoxReander 
          labels={labels}
        />
      </InfoBox> 
    </React.Fragment>
  )
});


const GraphHeaderBoxReander = (({labels}) => {
  const Title = styled.h5`
    display: inline-block;
    margin-bottom: 0px;
    padding-bottom: 5px;
  `;
  
  const SubTitle = styled.div`
    display: inline-block;
    font-size: 0.60rem;
    padding-bottom: 5px;
  `;

  const Info = styled.div`
    font-size: 0.8rem;
    padding-bottom: 10.0px;
  `;

  const Button_ = styled(Button)`
    font-size: 0.75em;
    padding: 0.0px;
    float: right;
    position: relative; 
    left: 10px;
    top: -10px;
  `;

  const InfoLong = styled.div`
    font-size: 0.75rem;
    padding-bottom: 10.0px;
  `;

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button_ 
        variant="link"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Read more
      </Button_>
      <Title>
        {labels.title}&nbsp;
      </Title>
      <SubTitle>
        {labels.sub_title}
      </SubTitle>


      <Info>
       {labels.info}&nbsp;
      </Info>

      <Collapse in={open}>
        <InfoLong>
          <hr />
          {labels.info_long}
        </InfoLong>
      </Collapse>
  </React.Fragment>
  );
});









// export default GraphStatsRanges;


// export const GraphStatsRanges3 = ({ keys, values, general_info }) => (
// {
//     const __div = styled.div`
//         width: 95%;
//         height: 350px;
//     `;




// export const GraphDiameterCalculated = ({data}) => (
//     <ResponsiveBarCanvas
//         data={data}
//         keys={[
//             'diameter_calculated'
//         ]}
//         indexBy="id"
//         margin={{ top: 50, right: 120, bottom: 50, left: 120 }}
//         // pixelRatio={1.100000023841858}
//         padding={0.0}
//         innerPadding={0}
//         minValue="auto"
//         maxValue="auto"
//         layout="vertical"
//         reverse={false}
//         colors={{ scheme: 'nivo' }}
//         colorBy="id"
//         borderWidth={0}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//             tickSize: 0,
//             legend: 'Diameters of a single circle',
//             legendPosition: 'middle',
//             legendOffset: 20,
//             format: () => '',
//         }}
//         axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'diameter in meters',
//             legendPosition: 'middle',
//             legendOffset: -55,
//             // format: (value) => value +' m',
//         }}
//         enableGridX={false}
//         enableGridY={true}
//         enableLabel={false}
//         isInteractive={true}

//     />
// )

// export const GraphDiameterCalculatedStats = ({ keys, values }) => (
//     <ResponsiveBar
//         data={ values }
//         keys={keys}
//         margin={{ top: 50, right: 120, bottom: 50, left: 120 }}
//         padding={0.3}
//         colors={{ scheme: 'nivo' }}
//         groupMode='grouped'

//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'diameter range in meters',
//             legendPosition: 'middle',
//             legendOffset: 40,
//             format1: ((index) => {
//                 return 1;
//               // const item = data[index];

//               // const range_start = Math.round(item.range_start);
//               // const range_stop = Math.round(item.range_stop);

//               // return `${range_start} - ${range_stop}`;
//           })
//         }}
//         axisLeft={{
//             tickSize: 1,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'circles count',
//             legendPosition: 'middle',
//             legendOffset: -85,
//         }}
//         layout="vertical"
//         enableLabel={true}
//         label_tmp={(item => {
//             return 'label'
//             // return `${item.data.count} ( ${Math.round(item.data.percentage)}% )`
//         })}
//         labelSkipWidth={35}
//         labelSkipHeight={35}
//         labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.6 ] ] }}
//         animate={true}
//         motionStiffness={90}
//         motionDamping={15}
//     />
// )


// export const GraphDiameterCalculatedSummary = ({ data }) => (
//     <ResponsiveBar
//         data={data}
//         indexBy='var'
//         keys={[ 'diameter', 'diameter2', 'diameter3' ]}
//         groupMode='grouped'
//         margin={{ top: 50, right: 120, bottom: 50, left: 120 }}
//         padding={0.3}
//         colors={{ scheme: 'nivo' }}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'Circle diameter',
//             legendPosition: 'middle',
//             legendOffset: 40
//         }}
//         axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: 'diameter in meters',
//             legendPosition: 'middle',
//             legendOffset: -55,

//         }}
//         layout="vertical"
//         enableLabel={true}

//         labelSkipWidth={35}
//         labelSkipHeight={12}
//         labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.6 ] ] }}
//         animate={true}
//         motionStiffness={90}
//         motionDamping={15}
//     />
// )

