import React, { Component } from 'react';
import {PieChart, Pie, Legend, Tooltip} from 'recharts';
import CircularProgressbar from 'react-circular-progressbar';





export default class PieGraph extends React.Component {
  // static displayName = 'PieDemo';

  render () {
    //console.log(this.props.budgetVsActual , 'in piechart')
    return (
      <div>
        <div className ="row">
          <div className ="col-sm-4">
            <div className = "progressBar1">
              <CircularProgressbar percentage={Math.floor(this.props.budgetVsActual.user * 100)} initialAnimation={true} classForPercentage = {(percent) => percent < 60 ? 'incomplete' : 'complete'}/>
            </div>
          </div>
          <div className ="col-sm-4">
            <div className = "progressBar2">
              <CircularProgressbar percentage={Math.floor(this.props.budgetVsActual.team * 100)} initialAnimation={true} classForPercentage = {(percent) => percent < 60 ? 'incomplete' : 'complete'}/>
            </div>
          </div>
          <div className ="col-sm-4">
            <div className = "progressBar3">
              <CircularProgressbar percentage={70} initialAnimation={true} classForPercentage = {(percent) => percent < 60 ? 'incomplete' : 'complete'}/>
            </div>
          </div>
        </div>
      </div>



      // <PieChart width={300} height={300}>
      //   <Pie isAnimationActive={true} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
      //   {/* <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/> */}
      //   <Tooltip/>
      // </PieChart>
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
