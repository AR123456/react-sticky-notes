//https://www.youtube.com/watch?v=jC-6X6HDAxQ
import React, { useRef, useEffect } from "react";
import { select, hierarchy, tree, linkHorizontal } from "d3";
import useResizeObserver from "./useResizeObserver";
// this code prevents the annimation from being kicked off every time the browser resizes
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function TreeChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // this code prevents the annimation from being kicked off every time the browser resizes
  // we save data to see if it changed
  const previouslyRenderedData = usePrevious(data);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    // use dimensions from useResizeObserver,
    // but use getBoundingClientRect on initial render
    // (dimensions are null for the first render)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // transform hierarchical data
    const root = hierarchy(data);
    // root enriched with x and y form each note
    // tree() is and inport
    // x and y are calculated from h & w
    const treeLayout = tree().size([height, width]);
    // linkVertical() and linkHorizontal() are
    //d3 utilities - helps with the d (start, end , curve)
    // attribute of a path element

    // needs source and target node to connect
    const linkGenerator = linkHorizontal()
      // the source and target are the default so do not have
      // to define them
      // .source((link) => link.source)
      // .target((link) => link.target)
      //
      // .x((node) => node.x)
      // .y((node) => node.y)
      // the x-accessor will recive the node accesing
      //in the source and target accessors
      .x((link) => link.y)
      // the y-accessor needs the y property of that node
      .y((link) => link.x);

    // enrich hierarchical data with coordinates
    treeLayout(root);

    console.warn("descendants", root.descendants());
    console.warn("links", root.links());

    // nodes - general updated pattern
    svg
      .selectAll(".node")
      // sync with data from the root descendants array
      // created using d3's tree and hierarchy functions above
      .data(root.descendants())
      .join((enter) => enter.append("circle").attr("opacity", 0))
      .attr("class", "node")
      .attr("cx", (node) => node.y)
      .attr("cy", (node) => node.x)
      .attr("r", 4)
      .transition()
      // stager the annimation
      .duration(500)
      // callback function that recives the current node object
      // look at the depth of the object and multiply by 500
      .delay((node) => node.depth * 300)
      .attr("opacity", 1);

    // links
    const enteringAndUpdatingLinks = svg
      // select all the existing link elements
      .selectAll(".link")
      // syncronize with thhis data
      .data(root.links())
      // create new path for new data
      .join("path")
      // add class of link so can update later
      .attr("class", "link")
      // d attr will be handled by the linkGenerator
      // .attr("d", (linkObj) => linkGenerator(linkObj))
      // can also be written like this :
      .attr("d", linkGenerator)
      // using stroke-dasharray and stroke-dashoffset
      // to annimate attr on path that define
      //  how the stroke is being dashed
      // needs 2 numbers to define stroke
      // no stroke to get dash
      // trick to annimation is to set the two
      // nums here an the one in storke-dashoffset
      // to the length of the path we are
      // currently working with
      .attr("stroke-dasharray", function () {
        // accessing the getTotalLength()
        // method that is on the path DOM element
        // need to use old school function to
        // get at "this" current path element
        // not avalible in an arrow function
        const length = this.getTotalLength();
        // return a string of the length of
        // the visible and the invisible part
        return `${length} ${length}`;
      })
      // make lines lines
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("opacity", 1);
    // this code prevents the annimation from being kicked off every time the browser resizes
    if (data !== previouslyRenderedData) {
      enteringAndUpdatingLinks
        // stroke-dashoffset defines empty dash to start
        .attr("stroke-dashoffset", function () {
          // accessing the getTotalLength()
          // method that is on the path DOM element
          // need to use old school function to
          // get at "this" current path element
          // not avalible in an arrow function
          return this.getTotalLength();
        })
        .transition()
        // stager the annimation
        .duration(500)
        // callback function that recives the current link object
        // look at the depth of the object and multiply by 500
        .delay((link) => link.source.depth * 500)
        .attr("stroke-dashoffset", 0);
    }

    // labels
    svg
      // general update pattern
      .selectAll(".label")
      // feed in the data
      .data(root.descendants())
      // append text element
      .join((enter) => enter.append("text").attr("opacity", 0))
      .attr("class", "label")
      // access node and data property where saved
      .attr("x", (node) => node.y)
      .attr("y", (node) => node.x - 12)
      // center and position
      .attr("text-anchor", "middle")
      .attr("font-size", 24)
      .text((node) => node.data.name)
      .transition()
      .duration(500)
      .delay((node) => node.depth * 300)
      .attr("opacity", 1);
  }, [data, dimensions, previouslyRenderedData]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default TreeChart;
