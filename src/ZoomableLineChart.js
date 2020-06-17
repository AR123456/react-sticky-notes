// any chart that uses linear or continuous scales can make use of this technique

import React, { useRef, useEffect, useState } from "react";
import {
  select,
  scaleLinear,
  line,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  // d3 zoom function to define zoom behavior
  zoom,
  zoomTransform
} from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a ZoomableLineChart
 */

function ZoomableLineChart({ data, id = "myZoomableLineChart" }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // use state hook to handle zoom state when component re renders
  // check for zoom state and if so change elements in SVG , no default value
  const [currentZoomState, setCurrentZoomState] = useState();

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const svgContent = svg.select(".content");
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // scales + line generator
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([10, width - 10]);
    // check to see if there is a zoom state and if there is handle it a bit differently
    if (currentZoomState) {
      // rescaleX comes with zoom functionality
      const newXScale = currentZoomState.rescaleX(xScale);
      //overide the domain with the newxScale
      xScale.domain(newXScale.domain());
    }

    const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([height - 10, 10]);

    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y(d => yScale(d))
      .curve(curveCardinal);

    // render the line
    svgContent
      .selectAll(".myLine")
      .data([data])
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", lineGenerator);

    svgContent
      .selectAll(".myDot")
      .data(data)
      .join("circle")
      .attr("class", "myDot")
      .attr("stroke", "black")
      .attr("r", 4)
      .attr("fill", "orange")
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

    // zoom
    //generate then apply to the svg
    const zoomBehavior = zoom()
      // scaleExtend defines how far we can zoom in and out.
      .scaleExtent([0.5, 5])
      // limits zoom behaivor on click and drag
      .translateExtent([
        [0, 0],
        [width, height]
      ])
      // on zoom handler pass in funciton
      .on("zoom", () => {
        // zoomTransform makes use of the zoom behavior
        const zoomState = zoomTransform(svg.node());
        // store the zoom state in the use state hook
        setCurrentZoomState(zoomState);
      });
    /// connecting zoom behavior fuction to the svg
    svg.call(zoomBehavior);
    // the currentZoomState needs to be in the dependancy array of useEffect hook
    // needs to be called again every time zoom changes
  }, [currentZoomState, data, dimensions]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${id})`}></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default ZoomableLineChart;
