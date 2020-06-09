import React, { useRef, useEffect, useState } from "react";
import {
  select,
  geoPath,
  geoMercator,
  geoOrthographic,
  min,
  max,
  scaleLinear,
} from "d3";
import useResizeObserver from "./useResizeObserver";
// pass in data from state
function GeoChart({ data, property }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // need this to wire up the zoom in on the country,
  //put the selectedCountry into state
  const [selectedCountry, setSelectedCountry] = useState(null);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    // using d3 min and max to define the min and max of the
    // features array, properties object
    const minProp = min(
      data.features,
      (feature) => feature.properties[property]
    );
    const maxProp = max(
      data.features,
      (feature) => feature.properties[property]
    );
    // console.log(minProp, maxProp);
    // defining color scale based on min and max of population
    // use scaleLinear to map the domain to the range
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["#ccc", "red"]);

    // use resized dimensions optimization
    // but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // projects geo-coordinates on a 2D plane
    const projection = geoMercator()
      // changing to globe
      // const projection = geoOrthographic()
      // the world
      // .fitsize fits the projection to the current width and height of svg
      // then pass in a referance to the data that should appear
      .fitSize([width, height], selectedCountry || data)
      // the united states - just the us appears in the view prot
      // .fitSize([width, height], data.features[2])
      //  precision resets the reposition calculation
      // // to take away the jittery stuff happining on the zoom
      .precision(100);

    // takes geojson data,
    // transforms that into the d attribute of a path element
    // geoPath() retuns a functon that recives features from
    // geo json file and transforms them into d elements of the path element
    // we want to render a path element for every country in the world
    // attach the d elemnts to the path to define their shape
    const pathGenerator = geoPath()
      // defined abouve
      .projection(projection);

    //  use general update pattern to render each country
    // create a path element for each country in the world
    svg
      // selectAll the existing elements
      .selectAll(".country")
      // sync with features data
      // pass in the features array from the data in the GeoChart file
      .data(data.features)
      // join - create new path element for any new peice of data
      .join("path")
      // add in the on cick zoom
      // on the click recive the current feature as an argument in callback
      //
      .on("click", (feature) => {
        // set the selected country to this feature
        // to have the currently selected country at our disposal
        // use that country as the referace for the projection
        // in the projection const
        // if there is no selectedCountry just go back to the entire world
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      // add class of country so the can update later on
      .attr("class", "country")
      // adding transition to the zoom in on selected country and
      // color coding with select property to hightlight dropdown
      .transition()
      // define the fill attribute of the path element with right color
      // pass current value of that property to colorScale
      // passin features.properties with the current property that we have
      // recived as a prop
      .attr("fill", (feature) => colorScale(feature.properties[property]))
      // define the shape of every country
      // add d attribute to path , define a call back function that
      // recives the current feature and retuns th appropriate d attribute
      .attr("d", (feature) => pathGenerator(feature));

    // render text that displays the value of the highlighted property in svg
    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text(
        (feature) =>
          // pass the current property of the selected feature
          feature &&
          feature.properties.name +
            ": " +
            feature.properties[property].toLocaleString()
      )
      .attr("x", 10)
      .attr("y", 25);
  }, [data, dimensions, property, selectedCountry]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default GeoChart;
