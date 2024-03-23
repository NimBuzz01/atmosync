import React, { useEffect } from "react";
import { WebcamTest } from "../info-container/webcam-sample-test";
import { getMusicByGenre } from "@/lib/utils/spotify";

const PlayerContainer = () => {
  const [music, setMusic] = React.useState([]);
  useEffect(() => {
    getMusicByGenre("classical");
    setMusic(music);
  }, []);
  return <div className="h-full p-4 bg-slate-700 text-slate-100"></div>;
};

export default PlayerContainer;
