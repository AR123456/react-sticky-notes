import React, { Component } from "react";

class SearchBar extends Component {
  onInputChange(event) {
    console.log(event.target.value);
  }
  // onInputClick() {
  //   console.log("Input was clicked");
  // }
  render() {
    return (
      <div className="ui segment">
        <form className="ui form " action="">
          <div className="field">
            <label htmlFor="">Image Search</label>
            <input
              type="text"
              // onClick={this.onInputClick}
              onChange={this.onInputChange}
              name=""
              id=""
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
