import React from "react";
import MovieCard from "./MovieCard";

interface MovieListProps {
  [key: string]: any;
  title: string;
}

function MovieList({ title, data }: MovieListProps) {
  if (Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div className="text-white  relative top-7 flex flex-col ">
      <h1 className="relative text-3xl font-semibold">{title}</h1>
      <div className="relative gap-3 top-5 grid grid-cols-4">
        {data.map((item: any, index: number) => (
          <MovieCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
