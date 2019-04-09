import React, { Component } from "react";

class SearchBar extends Component {
  state = { term: "" };
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
              value={this.state.term}
              onChange={e => this.setState({ term: e.target.value })}
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
