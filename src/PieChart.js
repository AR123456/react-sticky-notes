import React, { useRef, useEffect } from "react";
// need to import arc, pie  and interpolate from d3

import { select, arc, pie, interpolate } from "d3";
import useResizeObserver from "./useResizeObserver";

function PieChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;
    // need 2 path elements in this pie chart.
    // the orange color represents the confedance image is there
    // the grey color is confedace the image is not there
    //////// like 2 slices of pie that are changing size based on confidence
    // the shape of a path element is defined by the attribute d
    // d needs to be attached to each slice of the pie
    // need to attach  the d to the slices while making sure that
    // the belong to the same arc
    // d3 helper methods to help with createing the arc
    // and split it into multiple slices
    // can then extract the d attribte of the slices
    // and attach it to the path elements
    // In order to define d for each slice
    // 1)create arc
    // 2)split into segments
    // 3)derive d attribute
    const arcGenerator = arc().innerRadius(75).outerRadius(150);
    // pie transforms the data into instructions for the arc
    // so the arc can know at which angle to split into slices

    const pieGenerator = pie()
      // turn the full circle pie into a 1/2 circle
      // 1 math.PI is 1/2 of a circle
      // the arc starts at the top
      //so -0.5 * Math.PI says 1/4 circle to the left
      .startAngle(-0.5 * Math.PI)
      // end at 1/2 circle to the right
      .endAngle(0.5 * Math.PI)
      // the pieGenerator sorts by value
      // so need to sort null
      .sort(null);
    // getting data from app.js, useing pieGenerator
    // to turn into instructions for generating the path
    const instructions = pieGenerator(data);
    // d3 general updarte pattern
    svg
      // select all path elements wiht the class of slice
      .selectAll(".slice")
      //synchronize with data,which has been turned into
      //instructions how to generate the path
      .data(instructions)
      // create a path element for each new piece of data
      .join("path")
      // attach the attribute class to every new or updating element
      .attr("class", "slice")
      // make it visible
      // if index is 0 return yellow , if not return grey
      .attr("fill", (instruction, index) => (index === 0 ? "#eee" : "#ffcc00"))
      // this styling centers the chart ( so it is not in the upper left corner)
      .style(
        "transform",
        `translate(${dimensions.width / 2}px, ${dimensions.height}px)`
      )
      // the transition here is on the d attribute
      // (a complex string)
      .transition()
      // pass instructions to arch generator
      // attrTween is a transition over time
      // need to not return the archGenerator hard coded but
      // return a function - this function tells d3 how to generate
      // the d over time
      .attrTween("d", function (nextInstruction, index) {
        // bonus, which wasn't in video 07:
        // animate chart initially, but setting initial instruction
        const initialInstruction = pieGenerator([0, 1])[index];
        // need to interpolate
        // interpolate animates all the propertys of an object over time
        const interpolator = interpolate(
          //need to know last known inst and the next instruction
          // the instructions are objects defining stuff about the arc,slices
          // animate from old instrucition object to the new instruction object
          // animate the propertys from left to right over time
          this.lastInstruction || initialInstruction,
          nextInstruction
        );
        // d3 pick up the next update where the last update has finished
        this.lastInstruction = interpolator(1);
        // this returns t which is the timing or current state
        //of transition is a number between 0 and 1
        // 1 means it is just starting and
        // 0 means the transtion is over
        return function (t) {
          // return the instructions from the interpolator
          return arcGenerator(interpolator(t));
        };
      });

    // draw the pie
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default PieChart;
