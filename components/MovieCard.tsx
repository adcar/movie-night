import Image from "next/image";
import { useState } from "react";
import {
  StarIcon,
  XIcon,
  CheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import genres from "../utils/genres";
import { Movie } from "../pages/movies";
import Link from "next/link";
import { supabase } from "../utils/supabase";

function getGenres(genre_ids: number[]): string {
  let genresArray = [];
  for (let i = 0; i < genre_ids.length; i++) {
    const genre = genres.find((genre) => genre.id === genre_ids[i]);
    if (genre !== undefined) {
      genresArray.push(genre.name);
    }
    if (genresArray.length >= 2) {
      // I only want the first two genres to show on the card
      break;
    }
  }

  return genresArray.join(" / ");
}

async function alreadySeen(tmdbId: number) {
  const user = supabase.auth.user();
  if (user !== null) {
    const { data, error } = await supabase
      .from("watched_movies")
      .insert([{ user_id: user.id, tmdb_id: tmdbId, watched: true }]);

    console.table({ data, error });
  }
}

export default function MovieCard({ movie, className, forceRefresh }: Props) {
  const [isHovering, setHover] = useState(false);

  return (
    <div className={"relative shrink-0 " + className}>
      {forceRefresh ? (
        <a href={"/movie/" + movie.id}>
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
      ) : (
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
      )}

      <button
        onClick={() => alreadySeen(movie.id)}
        className="absolute top-2 right-2 h-11 w-11 rounded-full bg-slate-800/50 p-3 shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-white hover:text-slate-600"
      >
        <CheckIcon />
      </button>
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

          {!forceRefresh ? (
            <Link href={"/movie/" + movie.id}>
              <a
                className="animate__animated animate__fadeInUp animate__faster mt-2 w-36 flex-nowrap items-center rounded-md  p-2 text-xs font-medium  text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-slate-600"
                style={{
                  display: isHovering ? "flex" : "none",
                }}
              >
                <InformationCircleIcon className="mr-2 h-5 w-5" />
                MORE INFO
              </a>
            </Link>
          ) : (
            <a
              href={"/movie/" + movie.id}
              className="animate__animated animate__fadeInUp animate__faster mt-2 w-32 flex-nowrap rounded-md p-2 text-xs font-medium  text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-slate-600"
              style={{
                display: isHovering ? "flex" : "none",
              }}
            >
              <InformationCircleIcon className="h-5 w-5" />
              MORE INFO
            </a>
          )}

          <button
            onClick={() => alreadySeen(movie.id)}
            className="animate__animated animate__fadeInUp animate__faster mt-2 flex w-36 flex-nowrap items-center rounded-md  p-2 text-left text-xs font-medium  text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-slate-600"
            style={{
              display: isHovering ? "flex" : "none",
            }}
          >
            <CheckIcon className="mr-2 h-5 w-5" />
            ALREADY SEEN
          </button>
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
  forceRefresh?: boolean;
}
