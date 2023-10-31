import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function profiles() {
  const router = useRouter();
  const { data } = useCurrentUser();
  return (
    <div className="h-screen w-screh-screen gap-4 bg-[#0F1014] flex flex-col items-center justify-center">
      <p className="pb-10 text-4xl font-mono text-white">Who is watching?</p>
      <div
        className="relative w-40 h-40 cursor-pointer border-[3px] hover:scale-105 transition duration-200 ease-out rounded-full border-transparent hover:border-fuchsia-400  flex items-center  "
        onClick={() => router.push("/")}
      >
        <Image
          alt="logo"
          className="rounded-full object-contain"
          src={"/images/default-blue.png"}
          fill
        />
      </div>
      <h2 className="text-white ">{data?.name}</h2>
    </div>
  );
}

export default profiles;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
