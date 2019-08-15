import React from "react";
import Barchart from "./BarChart";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
class App extends React.Component {
  render() {
    return (
      <svg width="800" height="600">
        <Barchart x={100} y={100} width={400} height={300} />
      </svg>
    );
  }
}

export default App;
