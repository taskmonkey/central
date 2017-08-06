import React, { Component } from 'react';
import {PieChart, Pie, Legend, Tooltip} from 'recharts';

const data = [
  { name: 'iphone4', value: 120, fill: '#ff7300' },
  { name: 'iphone4s', value: 500, fill: '#e5671a' },
  { name: 'iphone5', value: 600, fill: '#907213' }
];
const sectors = [
  { cx: 250, cy: 250, startAngle: 0, endAngle: 60, innerRadius: 100, outerRadius: 200 },
  { cx: 250, cy: 250, startAngle: 60, endAngle: 120, innerRadius: 100, outerRadius: 200 },
  { cx: 250, cy: 250, startAngle: 120, endAngle: 180, innerRadius: 100, outerRadius: 200 },
  { cx: 250, cy: 250, startAngle: 180, endAngle: 240, innerRadius: 100, outerRadius: 200 },
  { cx: 250, cy: 250, startAngle: 240, endAngle: 300, innerRadius: 100, outerRadius: 200 },
  { cx: 250, cy: 250, startAngle: 300, endAngle: 360, innerRadius: 100, outerRadius: 200 },
];

export default class PieDemo extends React.Component {
  // static displayName = 'PieDemo';

  render () {
    return (
      <PieChart width={800} height={400}>
        <Pie isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
        {/* <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/> */}
        <Tooltip/>
      </PieChart>
      // <Surface width={500} height={500}>
      //   <Pie
      //     cx={250}
      //     cy={250}
      //     endAngle={0}
      //     startAngle={360}
      //     outerRadius={200}
      //     innerRadius={180}
      //     data={data}
      //     sectors={sectors}
      //     paddingAngle={10}
      //     dataKey="value"
      //     fill="#FFFFB2"
      //     stroke="#000"
      //   />
      //   {/* <line x1={0} y1={250} x2={500} y2={250} stroke="black"/> */}
      // </Surface>
    );
  }
}


