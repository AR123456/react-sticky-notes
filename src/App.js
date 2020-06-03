import React, { useState, useEffect } from "react";
import BBTimeline from "./BBTimeline";
import "./App.css";
function App() {
  // bbEpisodes is the value of the the data key
  const [bbEpisodes, setBbEpisodes] = useState([]);
  //bbCharacters makes the drop down selection
  const [bbCharacters, setBbCharacters] = useState([]);
  //  getting highlight from the onChange event that calls
  // the setHighlight method
  const [highlight, setHighlight] = useState();
  useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/characters?category=Breaking+Bad")
      .then((response) => response.ok && response.json())
      .then((characters) => {
        // useState method for getting the array of
        // characters passed into state
        // use to make drop down selection
        setBbCharacters(
          characters.sort((a, b) => a.name.localeCompare(b.name))
        );
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad")
      .then((response) => response.ok && response.json())
      .then((episodes) => {
        console.warn(episodes);
        // useState method to get episodes array passed into
        // state with key of data
        setBbEpisodes(episodes);
      })
      .catch(console.error);
  }, []);
  return (
    <React.Fragment>
      <h1>Breaking Bad Timeline</h1>
      <BBTimeline highlight={highlight} data={bbEpisodes} />
      <h2>Select your character</h2>
      <select value={highlight} onChange={(e) => setHighlight(e.target.value)}>
        <option>Select character</option>
        {bbCharacters.map((character) => (
          <option key={character.name}>{character.name}</option>
        ))}
      </select>
    </React.Fragment>
  );
}
export default App;
