import React from "react";
import SpotifyPlayer from "../spotify-player";

const PlayerContainer = () => {
  return (
    <div className="h-full flex flex-col p-4 bg-slate-700 text-slate-100">
      <SpotifyPlayer />
    </div>
  );
};

export default PlayerContainer;
