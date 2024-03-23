import React, { useEffect } from "react";
import Logo from "./logo";
import SearchBar from "./search-bar";
import Queue from "./queue";
import NowPlaying from "./now-playing";
import { TrackType } from "@/lib/types";

const SpotifyPlayer = () => {
  const [track, setTrack] = React.useState<TrackType>({
    name: "",
    artist: "",
    genre: "",
    duration: "",
    image: "",
  });
  useEffect(() => {
    setTrack({
      name: "Mean It",
      artist: "Lauv, LANY",
      genre: "Pop",
      duration: "3:53",
      image: "/logo.png",
    });
  }, []);
  return (
    <div className="grow flex flex-col">
      <Logo />
      <SearchBar />
      <Queue />
      <NowPlaying track={track} />
    </div>
  );
};

export default SpotifyPlayer;
