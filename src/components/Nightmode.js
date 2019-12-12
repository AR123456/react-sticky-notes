import React from "react";
import StyledNightmode from "./styles/StyledNightmode";

const Nightmode = ({ nightModeCallback, nightMode }) => (
  <StyledNightmode>
    <span>Nightmode: </span>
    <label className="switch">
      <input
        type="checkbox"
        checked={nightMode}
        onChange={nightModeCallback}
      ></input>
      <span className="slider round"></span>
    </label>
    Nightmode
  </StyledNightmode>
);

export default Nightmode;
