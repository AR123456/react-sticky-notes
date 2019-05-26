import React, { Component } from "react";
// import { render } from "react-dom";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

class BChart extends Component {
  render() {
    const styles = {
      fontFamily: "sans-serif",
      textAlign: "center"
    };

    const data = [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 }
    ];
    return (
      <div style={styles}>
        <h1>Recharts basic demo</h1>
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="quarter" />
          <YAxis dataKey="earnings" />
          <Bar dataKey="earnings" />
        </BarChart>
      </div>
    );
  }
}
export default BChart;
