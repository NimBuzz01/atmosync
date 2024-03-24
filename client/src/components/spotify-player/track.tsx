import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useMusicPlayerContext } from "@/contexts/music-player-context";
import { formatDuration } from "@/lib/utils";

const Track = ({
  song,
  index,
}: {
  song: SpotifyApi.TrackObjectFull;
  index: number;
}) => {
  const { setCurrentPlaying, spotifyApi } = useMusicPlayerContext();
  return (
    <Button
      className="flex w-full mb-2 py-6 px-4"
      variant="ghost"
      onClick={() => {
        setCurrentPlaying(song);
        // spotifyApi?.addToQueue(song.href);
      }}
    >
      <p className="text-sm mr-4 w-3 ">{index}</p>
      <Image
        src={song.album.images[0].url}
        alt={song.album.name}
        width={35}
        height={35}
        className="bg-slate-100 rounded-md mr-4"
      />

      <div className="grow text-left -space-y-1 overflow-x-hidden">
        <p className="text-lg">{song.name}</p>
        <p className="text-sm">
          {song.artists.map((artist, index) => (
            <span key={index}>{artist.name}, </span>
          ))}
        </p>
      </div>
      <p className="w-[40%] text-left overflow-x-hidden">{song.name}</p>
      <p className="w-[5%] text-left ">{formatDuration(song.duration_ms)}</p>
    </Button>
  );
};

export default Track;
