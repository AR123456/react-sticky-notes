import React, { useRef, useEffect } from "react";
import { select } from "d3";
import useResizeObserver from "./useResizeObserver";

function SimpleCircle() {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  //
  useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;
    svg
      .append("circle")
      .attr("cx", 100)
      .attr("cy", 100)
      .attr("r", 70)
      .attr("fill", "grey");
  });
  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}
export default SimpleCircle;
