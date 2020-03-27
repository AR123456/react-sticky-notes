import React, { useState } from "react";
import SimpleCircle from "./SimpleCircle";

import "./App.css";

function App() {
  const [data] = useState([]);
  return (
    <React.Fragment>
      <h2>React Hooks and D3 </h2>
      <SimpleCircle data={data} />
      {/* <button onClick={() => setData(data.map(value => value + 5))}>
        Update data
      </button> */}
    </React.Fragment>
  );
}

export default App;
