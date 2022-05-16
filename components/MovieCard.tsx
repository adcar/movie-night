import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import genres from "../utils/genres";
import { Movie } from "../pages/movies";
import Link from "next/link";

function getGenres(genre_ids: number[]): string {
  let genresArray = [];
  for (let i = 0; i < genre_ids.length; i++) {
    const genre = genres.find((genre) => genre.id === genre_ids[i]);
    if (genre !== undefined) {
      genresArray.push(genre.name);
    }
    if (genresArray.length >= 2) {
      break;
    }
  }

  return genresArray.join(" / ");
}

export default function MovieCard({ movie, className }: Props) {
  const [isHovering, setHover] = useState(false);
  const [timeout, setTimeoutFunc]: any = useState(null);

  return (
    <div className={"relative shrink-0 " + className}>
      <Link href={"/movie/" + movie.id}>
        <a>
          <Image
            className="rounded-md"
            width={300}
            height={169}
            src={
              movie.backdrop_path !== null
                ? "https://image.tmdb.org/t/p/w300" + movie.backdrop_path
                : "/placeholder.svg"
            }
          />
        </a>
      </Link>

      <div
        className="absolute bottom-0 flex h-16 w-full divide-x rounded-md bg-slate-800/40 px-3 py-2 shadow-md backdrop-blur-lg transition-all duration-300 ease-in-out hover:h-full"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="w-3/4">
          <h2
            className={
              "overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-slate-200 "
            }
            title={movie.title}
          >
            {movie.title}
          </h2>
          <p className="text-sm text-slate-300">{getGenres(movie.genre_ids)}</p>
          <p
            className={
              "animate__animated animate__fadeInUp animate__faster mt-1  text-xs text-slate-300"
            }
            style={{
              display: isHovering ? "block" : "none",
            }}
          >
            {movie.release_date.slice(0, 4)}
          </p>
          <Link href={"/movie/" + movie.id}>
            <a
              className="animate__animated animate__fadeInUp animate__faster mt-11 w-28 rounded-md bg-slate-800/30 p-3 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-slate-600"
              style={{
                display: isHovering ? "block" : "none",
              }}
            >
              MORE INFO
            </a>
          </Link>
        </div>
        <p
          className="ml-3 flex w-1/4 items-center justify-center pl-3 transition-all duration-300 ease-in-out"
          style={{
            borderLeftWidth: 2,
            borderImage:
              "linear-gradient( to bottom, rgba(255,255,255,0), rgba(255,255,255,0.5), rgba(255, 255, 255, 0.0) ) 1 100%",
          }}
        >
          <StarIcon className="h-5 w-5" />
          <span className="ml-1 text-xs">
            {Math.round(movie.vote_average * 10) / 10}
          </span>
        </p>
      </div>
    </div>
  );
}

interface Props {
  movie: Movie;
  className?: string;
}
