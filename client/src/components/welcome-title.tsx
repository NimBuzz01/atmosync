import Image from "next/image";
import React from "react";

const WelcomeTitle = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image src="/logo.png" alt="atmosync-logo" width={36} height={36} />
      <p className="text-2xl font-bold">Welcome to Atmosync</p>
    </div>
  );
};

export default WelcomeTitle;
