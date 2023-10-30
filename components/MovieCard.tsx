import Image from "next/image";
import React from "react";
import PlayNow from "./PlayNow";
import { Icon } from "@iconify/react";

interface MovieCardProps {
  [item: string]: any;
}
function MovieCard({ item }: MovieCardProps) {
  console.log(item?.thumbnailUrl);
  return (
    <div className="col-span-1 group relative h-[12vw]">
      <img
        alt="logo"
        src={item?.thumbnailUrl}
        className="object-cover shadow-xl cursor-pointer group-hover:opacity-90  duration-200 rounded-lg transition ease-out w-[350px] h-[12vw]"
      />
      <div className=" absolute duration-200 transition ease-out top-0 group-hover:scale-110 group-hover:-translate-y-[3vw] shadow-xl z-10 opacity-0 group-hover:opacity-100">
        <img
          alt="logo"
          src={item?.thumbnailUrl}
          className="object-cover shadow-xl cursor-pointer group-hover:opacity-90 duration-200 rounded-t-lg transition ease-out w-[350px] h-[12vw]"
        />
        <div className="z-10  bg-zinc-800 lg:p-4 p-2 transition shadow-xl rounded-b-lg">
          <div className="flex gap-2">
            <PlayNow movieId={item?.id} />
            <button className="flex items-center rounded-full active:scale-105">
              <Icon
                icon="gala:add"
                width={40}
                className="max-sm:w-6 hover:bg-white/10 rounded-full text-white "
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
