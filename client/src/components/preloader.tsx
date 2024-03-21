import React from "react";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const Preloader = () => {
  return (
    <div className="w-44 h-44">
      <DotLottiePlayer src="/preloader.lottie" autoplay loop />
    </div>
  );
};

export default Preloader;
