import React from "react";
import { useSession } from "next-auth/react";
import SettingsMenu from "./settings-menu";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <strong className="text-xl font-black">Atmosync</strong>
        <SettingsMenu />
      </div>
      <div className="-space-y-2">
        <p className="text-lg">Hello 👋</p>
        <h1 className="text-3xl font-semibold">
          {session?.user?.name as string}
        </h1>
      </div>
    </>
  );
};

export default Header;
