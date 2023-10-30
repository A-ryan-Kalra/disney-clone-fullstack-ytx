import useBillboard from "@/hooks/useBillboard";
import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { Icon } from "@iconify/react";
import PlayNow from "./PlayNow";

function Billboard() {
  const { data } = useBillboard();
  // console.log(data);
  return (
    <div className="bg-[#0F1014] relative flex-grow flex ml-0 text-white ">
      <video
        src={data?.videoUrl}
        autoPlay
        loop
        muted
        className="w-screen lg:h-[80vh]  h-[30vh] object-cover brightness-[80%]"
      ></video>

      <div className="left-3 absolute top-[100px]  lg:top-[200px]">
        <div className="group">
          <div className="flex flex-col gap-3 cursor-default">
            <h1 className="lg:text-5xl font-serif group-hover:text-white text-gray-300/90">
              {data?.title}
            </h1>
            <h1 className="group-hover:text-white text-gray-300/90 lg:text-2xl text-[12px]  lg:w- text-left w-[300px] lg:w-[500px] font-serif">
              {data?.description}
            </h1>
          </div>
        </div>
        <div className="relative top-3 flex gap-3">
          <PlayNow movieId={data?.id} />
          <button className="rounded-lg  lg:px-5 lg:py-1 px-2 py-[2px]   flex items-center  bg-gray-400/50 hover:bg-white/40 duration-200 transition ease-out">
            <Icon
              icon="lgi:information-outline"
              width={25}
              className="text-white mr-1 max-sm:w-6 "
            />
            <span className="text-white font-semibold text-sm lg:text-[16px]">
              More info
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Billboard;
