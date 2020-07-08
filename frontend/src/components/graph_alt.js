import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBump } from '@nivo/bump'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
import styled from 'styled-components';


const datab = [
     
      {
        "id": "1",
        "data": [
                 
          {
            "y": 694,
            "x": "10:40:00"
          },
          {
            "y": 698,
            "x": "10:40:01"
          },
          {
            "y": 686,
            "x": "10:40:02"
          },
          {
            "y": 691,
            "x": "10:40:03"
          },
          {
            "y": 682,
            "x": "10:40:08"
          },
          {
            "y": 657,
            "x": "10:40:13"
          },
          {
            "y": 649,
            "x": "10:40:18"
          }
          
        ]
      },
      {
        "id": "2",
        "data": [
        
          {
            "y": 1007,
            "x": "10:40:00"
          },
          {
            "y": 1009,
            "x": "10:40:01"
          },
          {
            "y": 1009,
            "x": "10:40:02"
          },
          {
            "y": 1008,
            "x": "10:40:03"
          },
          {
            "y": 1007,
            "x": "10:40:04"
          },
          {
            "y": 1006,
            "x": "10:40:05"
          },
          {
            "y": 1005,
            "x": "10:40:06"
          },
          {
            "y": 1005,
            "x": "10:40:07"
          },
          {
            "y": 1004,
            "x": "10:40:08"
          },
          {
            "y": 1005,
            "x": "10:40:09"
          },
          {
            "y": 1006,
            "x": "10:40:10"
          }
         
        ]
      }
    



    ]

const data= [
     
      {
        "id": "2",
        "data": [
        
          {
            "y": 1007,
            "x": "104000"
          },
          {
            "y": 1009,
            "x": "104001"
          },
          {
            "y": 1009,
            "x": "104002"
          },
          {
            "y": 1008,
            "x": "104003"
          },
          {
            "y": 1007,
            "x": "104004"
          },
          {
            "y": 1006,
            "x": "104005"
          },
          {
            "y": 1005,
            "x": "104006"
          },
          {
            "y": 1005,
            "x": "104007"
          },
          {
            "y": 1004,
            "x": "104008"
          },
          {
            "y": 1005,
            "x": "104009"
          },
          {
            "y": 1006,
            "x": "104010"
          }
         
        ]
      }
    ,
      {
        "id": "1",
        "data": [
                 
          {
            "y": 694,
            "x": "104000"
          },
          {
            "y": 698,
            "x": "104001"
          },
          {
            "y": 686,
            "x": "104002"
          },
          {
            "y": 691,
            "x": "104003"
          },
          {
            "y": 682,
            "x": "104008"
          },
          {
            "y": 657,
            "x": "104013"
          },
          {
            "y": 649,
            "x": "104018"
          }
          
        ]
      }



    ]


const data3=[
  {
    "id": "Serie 1",
    "data": [
      {
        "x": 2000,
        "y": 9
      },
      {
        "x": 2001,
        "y": 3
      },
      {
        "x": 2002,
        "y": 6
      },
      {
        "x": 2003,
        "y": 9
      },
      {
        "x": 2004,
        "y": 3
      }
    ]
  },
  {
    "id": "Serie 2",
    "data": [
      {
        "x": 2000,
        "y": 1
      },
      {
        "x": 2001,
        "y": 2
      },
      {
        "x": 2002,
        "y": 10
      },
      {
        "x": 2003,
        "y": 12
      },
      {
        "x": 2004,
        "y": 4
      }
    ]
  },
  {
    "id": "Serie 3",
    "data": [
      {
        "x": 2000,
        "y": 4
      },
      {
        "x": 2001,
        "y": 1
      },
      {
        "x": 2002,
        "y": 2
      },
      {
        "x": 2003,
        "y": 7
      },
      {
        "x": 2004,
        "y": 7
      }
    ]
  },
  {
    "id": "Serie 4",
    "data": [
      {
        "x": 2000,
        "y": 12
      },
      {
        "x": 2001,
        "y": 4
      },
      {
        "x": 2002,
        "y": 12
      },
      {
        "x": 2003,
        "y": 6
      },
      {
        "x": 2004,
        "y": 11
      }
    ]
  },
  {
    "id": "Serie 5",
    "data": [
      {
        "x": 2000,
        "y": 8
      },
      {
        "x": 2001,
        "y": 11
      },
      {
        "x": 2002,
        "y": 4
      },
      {
        "x": 2003,
        "y": 10
      },
      {
        "x": 2004,
        "y": 6
      }
    ]
  },
  {
    "id": "Serie 6",
    "data": [
      {
        "x": 2000,
        "y": 6
      },
      {
        "x": 2001,
        "y": 12
      },
      {
        "x": 2002,
        "y": 9
      },
      {
        "x": 2003,
        "y": 11
      },
      {
        "x": 2004,
        "y": 12
      }
    ]
  },
  {
    "id": "Serie 7",
    "data": [
      {
        "x": 2000,
        "y": 11
      },
      {
        "x": 2001,
        "y": 9
      },
      {
        "x": 2002,
        "y": 1
      },
      {
        "x": 2003,
        "y": 4
      },
      {
        "x": 2004,
        "y": 2
      }
    ]
  }
]
class GraphBase extends React.Component {

  render() {
    const DivGraph = styled.div`
      height: 450px;
      padding-bottom:90px;
      margin-top: 0px;
    `;
    return (
    <DivGraph>
      <MyResponsiveBump data={data3}/>
    </DivGraph>
  )
    }
}

const MyResponsiveBump = ({ data /* see data tab */ }) => (
    <ResponsiveBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        colors={{ scheme: 'spectral' }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -36
        }}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'ranking',
            legendPosition: 'middle',
            legendOffset: -40
        }}
    />
)
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data2 /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        // curve='natural'
        enablePoints={false}
        enableGridX={false}
        enableGridY={true}
        enableArea={true}
        // gridXValues={["14:05:09"]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}

        xScale={{ type: 'point', min: 'auto', max: 'auto', stacked: true, reverse: false  }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        // xFormat={()=> 2}
        axisTop={null}
        axisRight={null}

        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

export default GraphBase;