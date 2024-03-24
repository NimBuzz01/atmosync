import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useMusicPlayerContext } from "@/contexts/music-player-context";

const Track = ({
  song,
  index,
}: {
  song: SpotifyApi.TrackObjectFull;
  index: number;
}) => {
  const { setCurrentPlaying } = useMusicPlayerContext();
  return (
    <Button
      className="flex w-full mb-2 py-6 px-4"
      variant="ghost"
      onClick={() => {
        setCurrentPlaying(song);
      }}
    >
      <p className="text-sm mr-4">{index}</p>
      <Image
        src={song.album.images[0].url}
        alt={song.album.name}
        width={35}
        height={35}
        className="bg-slate-100 rounded-md mr-4"
      />

      <div className="grow text-left -space-y-1">
        <p className="text-lg">{song.name}</p>
        <p className="text-sm">{song.name}</p>
      </div>
      <p className="w-2/6 text-left ">{song.name}</p>
      <p className="w-[10%] text-left ">{song.duration_ms}</p>
    </Button>
  );
};

export default Track;
