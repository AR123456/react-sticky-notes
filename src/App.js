import React, { useState } from "react";
import RacingBarChart from "./RacingBarChart";
import useInterval from "./useInterval";
import "./App.css";
// functon to generate a random index from the data array
const getRandomIndex = (array) => {
  return Math.floor(array.length * Math.random());
};
function App() {
  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  //data array
  const [data, setData] = useState([
    {
      name: "alpha",
      value: 10,
      color: "#f4efd3",
    },
    {
      name: "beta",
      value: 15,
      color: "#cccccc",
    },
    {
      name: "charlie",
      value: 20,
      color: "#c2b0c9",
    },
    {
      name: "delta",
      value: 25,
      color: "#9656a1",
    },
    {
      name: "echo",
      value: 30,
      color: "#fa697c",
    },
    {
      name: "foxtrot",
      value: 35,
      color: "#fcc169",
    },
  ]);
  // every 1/2 second iterating over data
  // randomly select one of the objects in the
  // data array in increase its value by 10
  useInterval(() => {
    if (start) {
      const randomIndex = getRandomIndex(data);
      // use setData method to pass values (including the randomly
      // incremented one) into useState to get it over to the
      //RacingBarChart component
      setData(
        data.map((entry, index) =>
          index === randomIndex ? { ...entry, value: entry.value + 10 } : entry
        )
      );
      // tracking iterations to display in the p tag under the start race button
      setIteration(iteration + 1);
    }
  }, 500);

  return (
    <React.Fragment>
      <h1>Racing Bar Chart </h1>

      <RacingBarChart data={data} />
      {/* onClick event , use setStart method to pass to start to use state  */}
      <button onClick={() => setStart(!start)}>
        {start ? "Stop the race" : "Start the race"}
      </button>
      <p>Iteration:{iteration}</p>
    </React.Fragment>
  );
}

export default App;
