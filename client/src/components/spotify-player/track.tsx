import { TrackType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Track = ({ track, index }: { track: TrackType; index: number }) => {
  return (
    <Button className="flex w-full mb-2 py-6 px-4" variant="ghost">
      <p className="text-sm mr-4">{index}</p>
      <Image
        src={track.image}
        alt={track.name}
        width={35}
        height={35}
        className="bg-slate-100 rounded-md mr-4"
      />

      <div className="grow text-left -space-y-1">
        <p className="text-lg">{track.name}</p>
        <p className="text-sm">{track.artist}</p>
      </div>
      <p className="w-2/6 text-left ">{track.genre}</p>
      <p className="w-[10%] text-left ">{track.duration}</p>
    </Button>
  );
};

export default Track;
