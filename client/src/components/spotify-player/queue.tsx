import React from "react";
import Track from "./track";
import { TrackType } from "@/lib/types";

const Queue = () => {
  const tracks: TrackType[] = [
    {
      name: "Track 1",
      artist: "Artist 1",
      genre: "Genre 1 Genre 1 Genre 1 Genre 1",
      duration: "10:00",
      image: "/logo.png",
    },
    {
      name: "Track 2",
      artist: "Artist 2",
      genre: "Genre 2",
      duration: "10:00",
      image: "/logo.png",
    },
    {
      name: "Track 3",
      artist: "Artist 3",
      genre: "Genre 3",
      duration: "10:00",
      image: "/logo.png",
    },
    {
      name: "Track 1",
      artist: "Artist 1",
      genre: "Genre 1 Genre 1 Genre 1 Genre 1",
      duration: "10:00",
      image: "/logo.png",
    },
    {
      name: "Track 2",
      artist: "Artist 2",
      genre: "Genre 2",
      duration: "10:00",
      image: "/logo.png",
    },
    {
      name: "Track 3",
      artist: "Artist 3",
      genre: "Genre 3",
      duration: "10:00",
      image: "/logo.png",
    },
    {
      name: "Track 1",
      artist: "Artist 1",
      genre: "Genre 1 Genre 1 Genre 1 Genre 1",
      duration: "10:00",
      image: "/logo.png",
    },
    {
      name: "Track 2",
      artist: "Artist 2",
      genre: "Genre 2",
      duration: "10:00",
      image: "/logo.png",
    },
    {
      name: "Track 3",
      artist: "Artist 3",
      genre: "Genre 3",
      duration: "10:00",
      image: "/logo.png",
    },
    {
      name: "Track 1",
      artist: "Artist 1",
      genre: "Genre 1 Genre 1 Genre 1 Genre 1",
      duration: "10:00",
      image: "/logo.png",
    },
    {
      name: "Track 2",
      artist: "Artist 2",
      genre: "Genre 2",
      duration: "10:00",
      image: "/logo.png",
    },
    {
      name: "Track 3",
      artist: "Artist 3",
      genre: "Genre 3",
      duration: "10:00",
      image: "/logo.png",
    },
  ];
  return (
    <div className="flex flex-col grow h-full mb-4">
      <p className="text-2xl font-semibold mb-4">Queue</p>
      <div className="flex w-full mb-2 px-6  pr-12">
        <p className="grow text-xs">Name</p>
        <p className="w-2/6 text-xs">Genre</p>
        <p className="w-[10%] text-xs">Duration</p>
      </div>
      <div className="grow h-[300px] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-700 pr-2">
        {tracks.map((track, index) => (
          <Track track={track} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Queue;
