import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";

import "./styles.css";

import recaman from "./recaman";
import dashes from "./animated-dash";

const D3blackbox = ({ x, y, render }) => {
  const refAnchor = React.useRef(null);

  React.useEffect(() => {
    render(d3.select(refAnchor.current));
  });

  return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

function App() {
  return (
    <div className="App">
      <svg width="900" height="900">
        <D3blackbox x={0} y={0} render={svg => recaman(svg, 400, 400)} />
        <D3blackbox x={0} y={400} render={svg => dashes(svg, 300, 200)} />
      </svg>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
