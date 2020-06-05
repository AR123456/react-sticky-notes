// https://www.youtube.com/watch?v=lx5k8oQHaJQ&t=389s

import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useRsizeObserver from "./useResizeObserver";

function RacingBarChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useRsizeObserver(wrapperRef);
  // console.log(data);
  // console.log(dimensions);
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;
    // sorting data - this could acctually be in the app component
    // sorted so that the element in the array with the highest value
    // ends up located at index of 0
    data.sort((a, b) => b.value - a.value);
    // set scales
    const yScale = scaleBand()
      // add some padding so that there is a little
      // bit of space between the bars
      .paddingInner(0.1)
      // pass in all possible index's
      .domain(data.map((value, index) => index))
      .range([0, dimensions.height]);

    // map values of "horse" to the avalible space
    // scaleLinear and max are imports
    const xScale = scaleLinear()
      // 0 to the value of the "horse" with the greatest value
      .domain([0, max(data, (entry) => entry.value)])
      // output
      .range([0, dimensions.width]);
    //////////////// //draw bars - general update pattern
    svg
      // select all the bar elements found in the svg
      .selectAll(".bar")
      // sync with the data array
      // in the data function passing in a key function
      //key function takes the entry and the index
      // it retuns the name of the entry
      .data(data, (entry, index) => entry.name)
      .join(
        // passing in an enter call back so entering  or new
        //    element gets rect before transisitons
        // and has a y attribute
        (enter) =>
          enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      // pass in the color from the data array
      // to color the bars for each horse
      .attr("fill", (entry) => entry.color)
      // every rectangle gets a class of bar so it can update later on
      .attr("class", "bar")
      // x will start at 0 or the left side of the chart
      .attr("x", 0)
      // the thickness of the bar, all are of equal width
      .attr("height", yScale.bandwidth())
      ///////adding transitions
      // every thing after transision is what the transition appies to
      // width and y attribute of the bars
      .transition()
      // use the xScale to transform the horse value properties
      // into the width of the rect
      // entry in the callback function, pass the entry.value
      .attr("width", (entry) => xScale(entry.value))
      // y height - depends on the index of the current entry
      // pass index to yScale
      .attr("y", (entry, index) => yScale(index));

    //draw the labels
    // this is very similar to the draw bars except
    // rendering a text element
    svg
      .selectAll(".label")
      .data(data, (entry, index) => entry.name)
      .join((enter) =>
        // passing in an enter call back so entering or new
        //  elements get text before transisitons
        // and has a y attribute
        enter
          .append("text")
          .attr(
            "y",
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      // pass in the appropriate text element
      .text((entry) => `🐎 ... ${entry.name} (${entry.value} meters)`)
      .attr("class", "label")
      .attr("x", 10)
      .transition()
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}>
        <g className="x-axis"></g>
      </svg>
    </div>
  );
}

export default RacingBarChart;
