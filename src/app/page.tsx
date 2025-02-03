"use client";

import { NowPlaying } from "@/components/now playing/NowPlaying";
import { UpComing } from "@/components/Upcoming/UpComing";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="mt-14">
        <NowPlaying />
        <UpComing/>
      </div>
    </div>
  );
}
