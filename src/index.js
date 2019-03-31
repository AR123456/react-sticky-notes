import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  //special javascript function called constructor, it will be run before anything else - it can be used to initialize state
  constructor(props) {
    //super is a ref to the parent function and is just neccesary
    super(props);
    //this is the only time we do a direct assingment of state, ( inside the constructor function)
    this.state = { lat: null, errorMessage: "" };

    window.navigator.geolocation.getCurrentPosition(
      position => {
        //we called setstate
        this.setState({ lat: position.coords.latitude });
      },
      //make this error more helpful by adding state so we can re render
      err => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  //React says we have to define render
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error:{this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude:{this.state.lat} </div>;
    }
    return <div>Loading </div>;
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
