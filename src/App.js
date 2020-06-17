import React, { useState } from "react";
import "./App.css";
import ZoomableLineChart from "./ZoomableLineChart";

function App() {
  //data with array
  // const [data, setData] = useState([
  //   0,
  //   0,
  //   2,
  //   0,
  //   1,
  //   0,
  //   0,
  //   0,
  //   1,
  //   1,
  //   1,
  //   0,
  //   1,
  //   3,
  //   0,
  //   0,
  //   2,
  //   1,
  //   1,
  //   1,
  //   1,
  //   1,
  //   0,
  //   0,
  //   0,
  //   2,
  //   0,
  //   1,
  //   0,
  //   4,
  //   4,
  //   0,
  //   3,
  //   1,
  //   3,
  //   2,
  //   6,
  //   9,
  //   6,
  //   9,
  //   17,
  //   21,
  //   15,
  //   41,
  //   30,
  //   47,
  //   36,
  //   53,
  //   50,
  //   74,
  //   76,
  //   85,
  //   90,
  //   78,
  //   77,
  //   69,
  //   87,
  //   113
  // ]);
  // generating the random numes for the graph
  const [data, setData] = useState(
    Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
  );

  return (
    <React.Fragment>
      <h2>Zoomable Line Chart with D3 </h2>
      <ZoomableLineChart data={data} />
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
    </React.Fragment>
  );
}

export default App;
