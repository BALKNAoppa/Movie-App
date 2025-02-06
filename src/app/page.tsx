"use client";

import { NowPlaying } from "@/components/now playing/NowPlaying";
import { UpComing } from "@/components/Upcoming/UpComing";
import { Popular } from "@/components/Popular/Popular";
import { TopRated } from "@/components/Top Rated/TopRated";

export default function Home() {
  return (
    <div className="w-screen">
      <div>
        <NowPlaying />
        <UpComing/>
        <Popular/>
        <TopRated/>
      </div>
    </div>
  );
}
