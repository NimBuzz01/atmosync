import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMusicPlayerContext } from "@/contexts/music-player-context";
import { Button } from "../ui/button";
import { Progress } from "@radix-ui/react-progress";
import { BsSkipStartFill } from "react-icons/bs";
import { FaVolumeLow } from "react-icons/fa6";
import { IoPlay, IoPause } from "react-icons/io5";

const NowPlaying = () => {
  const { currentPlaying, songs, setCurrentPlaying, spotifyApi } =
    useMusicPlayerContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (currentPlaying) {
      setIsPlaying(true);
      // spotifyApi?.play();
      audioRef.current?.play();
    }
  }, [currentPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      // spotifyApi?.play();
    } else {
      audioRef.current?.pause();
      // spotifyApi?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      const updateProgress = () => {
        setProgress(
          (audioRef.current?.currentTime || 0) /
            (audioRef.current?.duration || 1)
        );
      };
      audioRef.current.addEventListener("timeupdate", updateProgress);
      return () => {
        audioRef.current?.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

  const playNext = () => {
    if (songs && currentPlaying) {
      const currentIndex = songs.findIndex(
        (song) => song.id === currentPlaying.id
      );
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentPlaying(songs[nextIndex]);
    }
  };

  const playPrevious = () => {
    if (songs && currentPlaying) {
      const currentIndex = songs.findIndex(
        (song) => song.id === currentPlaying.id
      );
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
      setCurrentPlaying(songs[previousIndex]);
    }
  };

  return (
    <div className="mt-auto border-t pt-4 border-slate-500">
      <p className="uppercase text-xs mb-1">Now Playing</p>
      {currentPlaying ? (
        <>
          <audio
            ref={audioRef}
            src={currentPlaying.preview_url ?? ""}
            onEnded={playNext}
          />
          <div className="flex items-center">
            <Image
              src={currentPlaying.album.images[0].url}
              alt={currentPlaying.album.name}
              width={35}
              height={35}
              className="bg-slate-100 rounded-md mr-2"
            />
            <div>
              <p className="font-bold text-xl">{currentPlaying.name}</p>
              <p className="text-xs">
                {currentPlaying.artists.map((artist, index) => (
                  <span key={index}>{artist.name}, </span>
                ))}
              </p>
            </div>
          </div>
          <div className="my-4">
            <Progress value={progress * 100} className="h-2 " />
            <div className="w-full flex items-center my-4">
              <div className="w-1/3"></div>
              <div className="w-1/3 flex gap-1 items-center justify-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                  onClick={playPrevious}
                >
                  <BsSkipStartFill className="text-2xl" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                  }}
                >
                  {isPlaying ? (
                    <IoPause className="text-2xl text-slate-900" />
                  ) : (
                    <IoPlay className="text-2xl text-slate-900" />
                  )}
                </Button>
                <Button
                  size="icon"
                  className="rotate-180 text-xl rounded-full"
                  variant="ghost"
                  onClick={playNext}
                >
                  <BsSkipStartFill className="text-2xl" />
                </Button>
              </div>
              <div className="w-1/3 gap-2 justify-end pr-6 flex items-center">
                <FaVolumeLow className="text-lg" />
                <input
                  type="range"
                  value={volume}
                  min={0}
                  max={100}
                  className="h-[6px] w-28 bg-white"
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>Nothing</>
      )}
    </div>
  );
};

export default NowPlaying;
