import React from "react";

import * as d3 from "d3";
import Axis from "./Axis";

const linearScale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([0, 200]);

class App extends React.Component {
  render() {
    return (
      <svg width="800" height="400" id="svg">
        <Axis scale={linearScale} type="Bottom" x={30} y={310} label="Bottom" />
        <Axis scale={linearScale} type="Left" x={100} y={100} label="Left" />
        <Axis scale={linearScale} type="Top" x={50} y={50} label="Top" />
        <Axis scale={linearScale} type="Right" x={200} y={100} label="Right" />
      </svg>
    );
  }
}

export default App;
