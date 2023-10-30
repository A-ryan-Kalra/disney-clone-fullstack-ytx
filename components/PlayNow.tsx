import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

interface PlayButtonProps {
  movieId: string;
}

function PlayNow({ movieId }: PlayButtonProps) {
  const router = useRouter();
  return (
    <button
      className="rounded-lg active:scale-105 lg:px-5 lg:py-1 px-2 py-[1px] bg-white flex items-center hover:bg-white/50 duration-200 transition ease-out"
      onClick={() => router.push(`/watch/${movieId}`)}
    >
      <Icon
        icon="bi:play-fill"
        width={35}
        className="max-sm:w-6  text-black "
      />
      <span className="text-black font-semibold text-sm lg:text-[16px]">
        Play
      </span>
    </button>
  );
}

export default PlayNow;
