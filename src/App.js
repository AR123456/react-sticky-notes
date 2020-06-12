import React, { useState } from "react";

import "./App.css";
import BrushChart from "./BrushChart";
import BrushChartChild from "./BrushChartChild";

function App() {
  // const [data, setData] = useState([10, 25, 30, 40, 25, 60, 90, 102, 211, 55]);
  // this will randomly generate data.
  const [data, setData] = useState(
    Array.from({ length: 30 }).map(() => Math.round(Math.random() * 100))
  );
  // this will add more data
  const onAddDataClick = () =>
    setData([...data, Math.round(Math.random() * 100)]);

  return (
    <React.Fragment>
      <h2>Visually filtering data with d3-brush</h2>

      <BrushChart data={data}>
        {/* this is where children are passed */}
        {/* selection is passing data from bursh chart into the BruxhChartChild component */}
        {(selection) => <BrushChartChild data={data} selection={selection} />}
      </BrushChart>
      <button onClick={onAddDataClick}>Add data</button>

      {/* <Video /> */}
    </React.Fragment>
  );
}

export default App;
