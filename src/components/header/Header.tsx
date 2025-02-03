"use client";
import React from "react";
import { Film, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input"

const Header = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="fixed top-0 inset-x-0 z-20 h-[59px] bg-background flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0">
        <div className="flex items-center gap-x-2 text-indigo-700">
          <Film className="w-5 h-5" />
          <h4 className="font-bold italic">Movie Z</h4>
        </div>
        <div className="w-[488px] h-[36px] border">
          <div className="flex [mix-width:449px]:hidden items-center">
            <Search
              className=""
            />
            <Input
              type="text"
              placeholder="Search"
              className="no-border"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <Button className="w-9 h-9 sm:hidden" variant={"outline"}>
            <Search />
          </Button>
          <Button
            variant="outline"
            className="w-9 h-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;