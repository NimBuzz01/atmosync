import React from "react";
import InfoContainer from "./info-container";
import PlayerContainer from "./player-container";

const MainContainer = () => {
  return (
    <div className="flex w-full h-screen lg:flex-row flex-col">
      <div className="w-full lg:w-1/2">
        <InfoContainer />
      </div>
      <div className="w-full lg:w-1/2">
        <PlayerContainer />
      </div>
    </div>
  );
};

export default MainContainer;
