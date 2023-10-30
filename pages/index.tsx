import Image from "next/image";
import { Inter } from "next/font/google";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovie from "@/hooks/useMovie";
import useMovieList from "@/hooks/useMovieList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: movie = [] } = useMovieList();
  // console.log(movie);
  return (
    <div className="flex bg-[#0F1014]">
      <Navbar />
      {/* <button onClick={() => signOut()}>signOut</button> */}
      <div className="pb-40">
        <Billboard />
        <MovieList title="Trending Now" data={movie} />
      </div>
    </div>
  );
}

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
  return {
    props: {},
  };
}
