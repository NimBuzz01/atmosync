import React from "react";
import { FaSpotify } from "react-icons/fa6";

const Logo = () => {
  return (
    <div className="flex items-center justify-between text-xl">
      <p>Music Player</p>
      <div className="flex items-center gap-2">
        <FaSpotify className="text-[#1ED760]" />
        <p>Spotify</p>
      </div>
    </div>
  );
};

export default Logo;
