import React from "react";
import TreeChart from "./TreeChart";
import ForceTreeChart from "./ForceTreeChart";
// import Video from "./Video";
import "./App.css";

const data = {
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
    },
  ],
};

function App() {
  return (
    <React.Fragment>
      <h2>Responsive D3 Force Layout</h2>
      <br />
      <br />

      <ForceTreeChart data={data} />
      <h2>Responsive Animated Tree Chart</h2>
      <TreeChart data={data} />
    </React.Fragment>
  );
}

export default App;
