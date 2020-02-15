import React from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";
console.log(emojipedia);

function createEntry(emojipedia) {
  return (
    <Entry
      id={emojipedia.id}
      emoji={emojipedia.emoji}
      name={emojipedia.name}
      meaning={emojipedia.meaning}
    />
  );
}
/// make dictionary terms into a seperate component called <Entry/>
// use the emojipeda.js to get data to render page

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      {emojipedia.map(createEntry)}
    </div>
  );
}

export default App;
