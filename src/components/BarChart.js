import React, { Component } from "react";
// import { render } from "react-dom";
import { ResponsiveBar } from "@nivo/bar";

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
        <h1>Nivo basic demo</h1>
        <div style={{ height: "400px" }}>
          <ResponsiveBar data={data} keys={["earnings"]} indexBy="quarter" />
        </div>
      </div>
    );
  }
}
export default BChart;
