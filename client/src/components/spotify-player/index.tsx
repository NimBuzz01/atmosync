import React, { useEffect } from "react";
import Logo from "./logo";
import SearchBar from "./search-bar";
import Queue from "./queue";
import NowPlaying from "./now-playing";

const SpotifyPlayer = () => {
  return (
    <div className="grow flex flex-col">
      <Logo />
      <SearchBar />
      <Queue />
      <NowPlaying />
    </div>
  );
};

export default SpotifyPlayer;
