import { TrackType } from "@/lib/types";
import React from "react";
import Image from "next/image";
import PlayerControls from "./player-controls";

const NowPlaying = ({ track }: { track: TrackType }) => {
  return (
    <div className="mt-auto border-t pt-4 border-slate-500">
      <p className="uppercase text-xs mb-1">Now Playing</p>
      <div className="flex items-center">
        <Image
          src={track.image}
          alt={track.name}
          width={35}
          height={35}
          className="bg-slate-100 rounded-md mr-2"
        />
        <div>
          <p className="font-bold text-xl">{track.name}</p>
          <p className="text-xs">{track.artist}</p>
        </div>
      </div>
      <PlayerControls />
    </div>
  );
};

export default NowPlaying;
