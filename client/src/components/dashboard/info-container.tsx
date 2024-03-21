"use client";
import React from "react";
import Header from "../info-container/header";
import AmbianceInfo from "../info-container/ambiance-info";

const InfoContainer = () => {
  return (
    <div className="flex h-full flex-col p-4">
      <Header />
      <AmbianceInfo />
      {/* <WebcamSession /> */}
    </div>
  );
};

export default InfoContainer;
