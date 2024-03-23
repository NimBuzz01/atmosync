import React, { useEffect } from "react";
import { getMusicByGenre } from "@/lib/utils/spotify";
import SpotifyPlayer from "../spotify-player";

const PlayerContainer = () => {
  const [music, setMusic] = React.useState([]);
  useEffect(() => {
    getMusicByGenre("classical");
    setMusic(music);
  }, []);
  return (
    <div className="h-full flex flex-col p-4 bg-slate-700 text-slate-100">
      <SpotifyPlayer />
    </div>
  );
};

export default PlayerContainer;
