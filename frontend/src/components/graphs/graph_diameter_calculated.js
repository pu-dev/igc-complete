import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveBarCanvas } from '@nivo/bar'


export const GraphDiameterCalculated = ({data}) => (
    <ResponsiveBarCanvas
        data={data}
        keys={[
            'diameter_calculated'
        ]}
        indexBy="id"
        margin={{ top: 50, right: 120, bottom: 50, left: 120 }}
        // pixelRatio={1.100000023841858}
        padding={0.0}
        innerPadding={0}
        minValue="auto"
        maxValue="auto"
        layout="vertical"
        reverse={false}
        colors={{ scheme: 'nivo' }}
        colorBy="id"
        borderWidth={0}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 0,
            legend: 'Diameters of a single circle',
            legendPosition: 'middle',
            legendOffset: 20,
            format: () => '',
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'diameter in meters',
            legendPosition: 'middle',
            legendOffset: -55,
            // format: (value) => value +' m',
        }}
        enableGridX={false}
        enableGridY={true}
        enableLabel={false}
        isInteractive={true}

    />
)


export const GraphDiameterCalculatedStats = ({ data }) => (
    <ResponsiveBar
        tooltipFormat={value => 'bong'}
        tooltip={({ id, value, color }) => (
            <strong style={{ color }}>
                fas: {value}
            </strong>
        )}
        theme={{
            tooltip: {
                container: {
                    background: '#333',
                },
            },
        }}
        data={data}
        keys={[ 'count' ]}
        margin={{ top: 50, right: 120, bottom: 50, left: 120 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'diameter range in meters',
            legendPosition: 'middle',
            legendOffset: 40,
            format: ((index) => {
              const item = data[index];

              const range_start = Math.round(item.range_start);
              const range_stop = Math.round(item.range_stop);

              return `${range_start} - ${range_stop}`;
          })
        }}
        axisLeft={{
            tickSize: 1,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'circles count',
            legendPosition: 'middle',
            legendOffset: -85,
        }}
        layout="vertical"
        enableLabel={true}
        label={(item => {
            return `${item.data.count} ( ${Math.round(item.data.percentage)}% )`
        })}
        labelSkipWidth={35}
        labelSkipHeight={35}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.6 ] ] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)


export const GraphDiameterCalculatedSummary = ({ data }) => (
    <ResponsiveBar
        data={data}
        indexBy='var'
        keys={[ 'diameter' ]}
        margin={{ top: 50, right: 120, bottom: 50, left: 120 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Circle diameter',
            legendPosition: 'middle',
            legendOffset: 40
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'diameter in meters',
            legendPosition: 'middle',
            legendOffset: -55,

        }}
        layout="vertical"
        enableLabel={true}

        labelSkipWidth={35}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.6 ] ] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)
