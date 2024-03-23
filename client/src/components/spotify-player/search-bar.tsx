import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 my-6">
      <Input
        type="text"
        placeholder="Search a song..."
        className="rounded-full"
      />
      <Button
        type="submit"
        variant="outline"
        size="icon"
        className="rounded-full text-slate-900 text-xl"
      >
        <IoSearchOutline className="rounded-full" />
      </Button>
    </div>
  );
};

export default SearchBar;
