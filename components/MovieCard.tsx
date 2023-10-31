import Image from "next/image";
import React from "react";

import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import FavoriteButton from "./FavoriteButton";

interface MovieCardProps {
  [item: string]: any;
}
function MovieCard({ item }: MovieCardProps) {
  //   console.log(item?.thumbnailUrl);
  const router = useRouter();

  return (
    <div className="col-span-1 group  relative h-[12vw]">
      <img
        alt="logo"
        src={item?.thumbnailUrl}
        className="object-cover shadow-xl cursor-pointer   sm:group-hover:opacity-0 delay-300  duration-200 rounded-md transition ease-out w-full h-[12vw]"
      />
      <div className=" absolute duration-200 w-full  transition ease-out top-0 group-hover:scale-110 group-hover:-translate-y-[3vw] delay-300 scale-0 shadow-md z-10 opacity-0 group-hover:opacity-100">
        <img
          alt="logo"
          src={item?.thumbnailUrl}
          className="object-cover shadow-xl cursor-pointer group-hover:opacity-90 duration-200 rounded-t-lg transition ease-out w-full h-[12vw]"
        />
        <div className="z-10 flex flex-col gap-2 bg-zinc-800 lg:px-4 lg:py-3 p-2 transition shadow-xl rounded-b-lg">
          <div className="flex items-center gap-2">
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => {
                router.push(`/watch/${item?.id}`);
              }}
            >
              <Icon
                icon="ph:play-fill"
                className="text-black text-[15px] md:text-[20px]"
              />
            </div>
            <FavoriteButton movieId={item?.id} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white max-sm:hidden text-[12px]  cursor-default font-mono">
              {item.description}
            </p>
            <div className="flex gap-3 cursor-default max-md:text-[6px]">
              <h1 className="text-green-400">{item?.duration}</h1>
              <h1 className="text-fuchsia-400">{item?.genre}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
