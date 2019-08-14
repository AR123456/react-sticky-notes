import React from "react";
import { render } from "react-dom";
import { Bar } from "@vx/shape";
import { scaleBand, scaleLinear } from "@vx/scale";
import { max, extent } from "d3-array";

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

const App = ({ width = 400, height = 400 }) => {
  const xMax = width;
  const yMax = height - 120;

  const x = d => d.quarter;
  const y = d => d.earnings;

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.4
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, y)]
  });

  return (
    <div style={styles}>
      <h1>VX basic demo</h1>
      <svg width={width} height={height}>
        {data.map((d, i) => {
          const barHeight = yMax - yScale(y(d));
          return (
            <Bar
              width={xScale.bandwidth()}
              height={barHeight}
              x={xScale(x(d))}
              y={yMax - barHeight}
              data={{ x: x(d), y: y(d) }}
            />
          );
        })}
      </svg>
    </div>
  );
};
export default App;
