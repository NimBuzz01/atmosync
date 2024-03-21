"use client";
import React from "react";
import Header from "../info-container/header";
import AmbianceInfo from "../info-container/ambiance-info";

const InfoContainer = () => {
  return (
    <div className="flex flex-col h-full p-4">
      <Header />
      <AmbianceInfo />
    </div>
  );
};

export default InfoContainer;
