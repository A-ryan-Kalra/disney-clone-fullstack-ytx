import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import NavIcons from "./NavIcons";
import { signOut } from "next-auth/react";

function Navbar() {
  return (
    <div className="sticky left-0 top-0 bg-[#0F1014] h-screen w-[100px] flex-col  flex ">
      <div className="relative w-[60px] h-[60px] mx-auto top-5 ">
        <Image
          src={"/images/disney+hotstar.svg"}
          className="object-contain"
          fill
          alt="logo"
        />
      </div>
      <nav className="relative flex flex-col top-[31%] justify-between items-center gap-10 translate-y-[-31%]">
        <div className="relative w-7 rounded-full h-7">
          <Image
            src={"/images/default-blue.png"}
            className="cursor-pointer rounded-full"
            fill
            alt="logo"
            onClick={() => signOut()}
          />
        </div>
        <NavIcons
          iconName1="iconamoon:search-thin"
          iconName2="iconamoon:search-thin"
        />
        <NavIcons iconName1="ic:outline-home" iconName2="ic:round-home" />
        <NavIcons iconName1="solar:tv-linear" iconName2="solar:tv-bold" />
        <NavIcons
          iconName1="mingcute:movie-line"
          iconName2="mingcute:movie-fill"
        />
        <NavIcons
          iconName1="ph:tennis-ball-light"
          iconName2="ph:tennis-ball-fill"
        />
      </nav>
    </div>
  );
}

export default Navbar;
