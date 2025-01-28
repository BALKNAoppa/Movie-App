import React from "react";
import { Film, Search, Moon } from "lucide-react";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <div className="fixed top-0 justify-between w-screen">
      <div className="mx-5 flex items-center justify-between my-5">
        <div className="flex text-indigo-700 gap-2">
          <Film />
          <p className="font-bold">Movie Z</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="w-9 h-9">
            <Search />
          </Button>
          <Button variant="outline" className="w-9 h-9">
            <Moon />
          </Button>
        </div>
      </div>
    </div>
  );
};
