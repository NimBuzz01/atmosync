import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";
import { BsSkipStartFill } from "react-icons/bs";
import { IoPause, IoPlay } from "react-icons/io5";
import { FaVolumeLow } from "react-icons/fa6";

const PlayerControls = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  return (
    <div className="my-4">
      <Progress value={33} className="h-2" />
      <div className="w-full flex items-center my-4">
        <div className="w-1/3"></div>
        <div className="w-1/3 flex gap-1 items-center justify-center">
          <Button size="icon" variant="ghost" className="rounded-full">
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
              <IoPlay className="text-2xl text-slate-900" />
            ) : (
              <IoPause className="text-2xl text-slate-900" />
            )}
          </Button>
          <Button
            size="icon"
            className="rotate-180 text-xl rounded-full"
            variant="ghost"
          >
            <BsSkipStartFill className="text-2xl" />
          </Button>
        </div>
        <div className="w-1/3 gap-2 justify-end pr-6 flex items-center">
          <FaVolumeLow className="text-lg" />
          <Progress value={33} className="h-[6px] w-28" />
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
