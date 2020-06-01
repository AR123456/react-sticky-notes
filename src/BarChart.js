import React, { useRef, useEffect } from "react";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";
import useResizeObserver from "./useResizeObserver";

function BarChart({ data }) {
  const svgRef = useRef();
  // console.log(svgRef);
  // use the wrapperRef to pass into dimensions from resize observer
  const wrapperRef = useRef();
  // console.log(wrapperRef);
  // getting dimensions from useResizeObserver component
  const dimensions = useResizeObserver(wrapperRef);
  // console.log(dimensions);
  useEffect(() => {
    // console.log(svgRef.current);
    // this ref gets updated and contains the svg DOM element
    // when all of the DOM elements have been rendered inside the browser
    // the best time to access this DOM element is inside of a useEffect hook
    // useEffect is called for the frist time when all of the DOM elements
    //have been rendered so can access the DOM element inside the svgRef
    // this is what also needs to happen with ResizeObserver.
    // need to use a useEffect hook again to access this DOM element inside
    //the ref when all the DOM elements have been rendered
    //here getting "dimension" from the return in the useResizeObserver Hook  component
    const svg = select(svgRef.current);
    // console.log(dimensions);
    // the first trip through dimensions are null, so in that case just return
    if (!dimensions) return;
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.width]) //make SVG dynamic with dimensions.width
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150]) //todo - this should use the min and max of the data
      .range([dimensions.height, 0]); //// make SVG dynamic with dimensions.height

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);

    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", `translateX(${dimensions.width}px)`)
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")

      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".tooltip")
          .data([value])
          .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)

          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => dimensions.height - yScale(value));
    // dimensions is a dependancy for this useEffect hook
  }, [data, dimensions]);
  // need to wrap the SVG in a div, resize observer is not
  // working when when passed to SVG directly
  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </div>
  );
}

export default BarChart;
