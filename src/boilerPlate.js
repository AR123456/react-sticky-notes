import React, { useRef, useEffect } from "react";
import { select } from "d3";
import useResizeObserver from "./useResizeObserver";

function MyChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  // use resize observer to have a responsive chart component
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    // access the svg element to work with D3
    const svg = select(svgRef.current);
    if (!dimensions) return;
    // sorting the data
    data.sort((a, b) => b.value - a.value);
    // const yScale

    // const xScale

    /// svg

    // draw the chart
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default MyChart;
