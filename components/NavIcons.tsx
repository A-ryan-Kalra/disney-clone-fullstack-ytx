import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface IconProps {
  iconName1?: string;
  iconName2?: string;
}

function NavIcons({ iconName1, iconName2 }: IconProps) {
  return (
    <div className="group duration-200 transition-all  cursor-pointer  ">
      <Icon
        icon={iconName1 as string}
        width={30}
        className="duration-200 transition-all  text-gray-400 group-hover:hidden"
      />
      <Icon
        icon={iconName2 as string}
        width={30}
        className="text-white hidden group-hover:scale-125 group-hover:inline duration-200 transition-all    "
      />
    </div>
  );
}

export default NavIcons;
