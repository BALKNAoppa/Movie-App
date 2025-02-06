"use client";
import React from "react";
import { Film, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select"


const Header = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div className=" inset-x-0 h-[59px] bg-background flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0">
        <div className="flex items-center gap-x-2 text-indigo-700">
          <Film className="w-5 h-5" />
          <h4 className="font-bold italic">Movie Z</h4>
        </div>
        <div className="relative hidden lg:flex items-center gap-x-3">
        <div className="w-[97px] h-[36px] max-lg:hidden">
          <div className="relative w-full">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
        </div>
        <div className="w-[379px] h-[36px] max-lg:hidden">
          <div className="relative w-full">
            <Input
              placeholder="Search..."
              className="pl-10 pr-4 w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        </div>
        <div className="flex items-center gap-x-3">
          <Button className="w-9 h-9 lg:hidden" variant={"outline"}>
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
