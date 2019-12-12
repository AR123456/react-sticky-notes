import React from "react";
import PlaylistHeader from "../PlaylistHeader";
import PlaylistItems from "../containers/PlaylistItems";
import NightMode from "../Nightmode";

const Playlist = props => (
  <>
    <NightMode></NightMode>
    <PlaylistHeader></PlaylistHeader>
    <PlaylistItems></PlaylistItems>
  </>
);

export default Playlist;
