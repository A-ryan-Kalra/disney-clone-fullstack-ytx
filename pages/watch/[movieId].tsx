import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import useMovie from "@/hooks/useMovie";

function Watch() {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);
  console.log(data);
  return (
    <div className="w-screen h-screen bg-black">
      <nav className="fixed top-0 z-10 cursor-default bg-black/70 flex w-full p-2 items-center">
        <Icon
          icon="ph:arrow-left"
          width={40}
          className="text-white mr-10 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <h1 className="text-3xl font-bold text-white">
          <span className="text-3xl text-white font-light">Watching: </span>
          {data?.title}
        </h1>
      </nav>
      <video
        autoPlay
        muted
        loop
        controls
        src={data?.videoUrl}
        className="w-full h-full"
      ></video>
    </div>
  );
}

export default Watch;
