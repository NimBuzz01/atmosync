import React from "react";
import Track from "./track";
import { useMusicPlayerContext } from "@/contexts/music-player-context";

const Queue = () => {
  const { songs } = useMusicPlayerContext();
  return (
    <div className="flex flex-col grow h-full mb-4">
      <p className="text-2xl font-semibold mb-4">Queue</p>
      <div className="flex w-full mb-2 px-6  pr-12">
        <p className="grow text-xs">Name</p>
        <p className="w-[40%] text-xs">Genre</p>
        <p className="w-[5%] text-xs">Duration</p>
      </div>
      <div className="grow h-[300px] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-700 pr-2">
        {songs ? (
          songs.map((song, index) => (
            <Track song={song} index={index} key={index} />
          ))
        ) : (
          <>No Music Found</>
        )}
      </div>
    </div>
  );
};

export default Queue;
