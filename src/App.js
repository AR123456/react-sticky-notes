import React, { useState } from "react";
import TreeChart from "./TreeChart";
import "./App.css";
// structure of the data is important.  D3 will look for the children
const initialData = {
  name: "😐",
  children: [
    {
      name: "🙂",
      children: [
        {
          name: "😀",
        },
        {
          name: "😁",
        },
        {
          name: "🤣",
        },
      ],
    },
    {
      name: "😔",
      children: [
        {
          name: "🥵",
        },
        {
          name: "😡",
        },
      ],
    },
    {
      name: "🐺",
      children: [
        {
          name: "🐕",
        },
      ],
    },
  ],
};
function App() {
  const [data, setData] = useState(initialData);

  return (
    <React.Fragment>
      <h1>Anamated Tree Chart</h1>
      <TreeChart data={data} />
      {/* This on click function resets the root node to 
      make the new root node the first child in the array  */}
      <button onClick={() => setData(initialData.children[0])}>
        Update Data
      </button>
    </React.Fragment>
  );
}

export default App;
