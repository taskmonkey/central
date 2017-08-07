import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';




const data = [
      {name: 'Richard', Finished: 4000, Remaining: 2400, amt: 2400},
      {name: 'Auste', Finished: 3000, Remaining: 1398, amt: 2210},
      {name: 'Alexander', Finished: 2000, Remaining: 9800, amt: 2290},
      {name: 'Daniel', Finished: 2780, Remaining: 3908, amt: 2000},
      {name: 'Eddie', Finished: 1890, Remaining: 4800, amt: 2181},
      {name: 'Timothy', Finished: 2390, Remaining: 3800, amt: 2500},
      {name: 'Michael', Finished: 3490, Remaining: 4300, amt: 2100},
];

export default class BarGraph extends Component{
  
  render(){
    return (
    <BarChart width={600} height={300} data={data}
        >
      <XAxis dataKey="name"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Bar dataKey="Remaining" stackId="a" fill="#8884d8" />
      <Bar dataKey="Finished" stackId="a" fill="#82ca9d" />
    </BarChart>
    )
  }
}