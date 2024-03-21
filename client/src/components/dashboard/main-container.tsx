import React from "react";
import InfoContainer from "./info-container";
import PlayerContainer from "./player-container";

const MainContainer = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2">
        <InfoContainer />
      </div>
      <div className="w-1/2">
        <PlayerContainer />
      </div>
    </div>
  );
};

export default MainContainer;
