// this is very much like the BrushChart so can start with a copy paste and remove what is not needed
// brush, children ,selection- we are now getting from outside , prev selection
import React, { useRef, useEffect, useState } from "react";
import {
  select,
  scaleLinear,
  line,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  brushX,
  event
} from "d3";
import useResizeObserver from "./useResizeObserver";
import usePrevious from "./usePrevious";

/**
 * Component that renders a BrushChart
 */
// defaulting in the id to be myClip path
function BrushChartChild({ data, selection, id = "myClipPath" }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    // defining content here so that clipPath knows were to show the svg window, content group element we want to render into
    const content = svg.select(".content");
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // scales + line generator
    // xScale still responsible for transforming index  value to pixle values
    const xScale = scaleLinear()
      // the selection here is what is coming from outside
      .domain(selection)
      .range([10, width - 10]);

    const yScale = scaleLinear()
      .domain([0, max(data)])
      // adding padding to top and bottom of chart
      .range([height - 10, 10]);

    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y(d => yScale(d))
      .curve(curveCardinal);

    // render the line
    content
      .selectAll(".myLine")
      .data([data])
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", lineGenerator);

    content
      .selectAll(".myDot")
      .data(data)
      .join("circle")
      .attr("class", "myDot")
      .attr("stroke", "black")
      .attr("r", (value, index) =>
        index >= selection[0] && index <= selection[1] ? 4 : 2
      )
      .attr("fill", (value, index) =>
        index >= selection[0] && index <= selection[1] ? "orange" : "black"
      )
      .attr("cx", (value, index) => xScale(index))
      .attr("cy", yScale);

    // axes
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
  }, [data, dimensions, usePrevious, selection]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          {/* clipPath fixes the overflow.  It is a window in front of SVG element that only makes what is in window visable */}
          <defs>
            {/* inside the defs define the clipPath , it needs an id */}
            <clipPath id={id}>
              {/* define the shape of the window  */}
              <rect x="0" y="0" width="100%" hight="100%" />
            </clipPath>
          </defs>
          {/* apply the clipPaht to a new group calling content. The URL defines the id of the clipPath definition */}
          <g className="content" clipPath={`url(#${id})`} />
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default BrushChartChild;
