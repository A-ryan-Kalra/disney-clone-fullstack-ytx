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
import useFavorites from "@/hooks/useFavorites";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: movie = [] } = useMovieList();
  const { data: favorites = [], mutate } = useFavorites();
  // console.log(movie);
  return (
    <div className="flex bg-[#0F1014]  ">
      <Navbar />
      {/* <button onClick={() => signOut()}>signOut</button> */}
      <div className="pb-60 ">
        <Billboard />
        <div className="flex flex-col gap-10">
          <MovieList title="Trending Now" data={movie} />
          <MovieList title="Favorites" data={favorites} />
          <MovieList title="My Likes" data={favorites} />
        </div>
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
