"use client";

import { NowPlaying } from "@/components/now playing/NowPlaying";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="mt-14">
        <NowPlaying />
      </div>
    </div>
  );
}
