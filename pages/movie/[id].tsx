import Head from "next/head";
import { NextPageContext } from "next/types";
import { stringify } from "query-string";
import Image from "next/Image";
import { StarIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Movie } from "../movies";
import HorizScroll from "../../components/HorizScroll";
import prettyMilliseconds from "pretty-ms";

export default function MoviePage({ details }: Props) {
  const {
    title,
    backdrop_path,
    genres,
    release_date,
    vote_average,
    tagline,
    overview,
    status,
    recommendations,
    production_companies,
    runtime,
  } = details;
  return (
    <>
      <Head>
        <title>Movie Night</title>
      </Head>
      <header className="relative h-[500px] w-full xl:h-[800px]">
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition={backdrop_path !== null ? "center" : "top"}
          priority
          quality={100}
          src={
            backdrop_path !== null
              ? "https://image.tmdb.org/t/p/w1280" + backdrop_path
              : "/placeholder.svg"
          }
          alt={`${title} backdrop`}
          placeholder="blur"
          blurDataURL={"https://image.tmdb.org/t/p/w300" + backdrop_path}
        />
        <div className="absolute top-0 left-0 flex h-full  w-full flex-row items-end bg-gradient-to-b from-transparent to-slate-800/80">
          <div className="container mx-auto px-5 pb-5">
            <h1 className="text-2xl font-bold lg:mr-10 lg:text-4xl xl:text-6xl">
              {title}{" "}
              <span className="ml-3 inline-flex items-center align-middle text-sm font-normal text-slate-200 lg:ml-5 lg:text-2xl xl:text-3xl">
                {vote_average !== 0 ? (
                  <>
                    <StarIcon className="h-5 w-5 lg:h-7 lg:w-7 xl:h-12 xl:w-12" />
                    <span className="ml-1 lg:ml-2 xl:ml-3">
                      {" "}
                      {vote_average}
                    </span>
                  </>
                ) : (
                  ""
                )}

                <span className="ml-3 align-middle text-slate-300 lg:ml-6">
                  {" "}
                  {release_date.slice(0, 4)}{" "}
                </span>

                {runtime > 0 ? (
                  <span className="ml-3 align-middle text-slate-300 lg:ml-6">
                    {prettyMilliseconds(runtime * 60000)}
                  </span>
                ) : (
                  ""
                )}
              </span>
            </h1>
            <div className="mt-5 flex space-x-2 overflow-x-auto">
              {genres.map((genre) => (
                <Link key={genre.id} href={"/movies?genre=" + genre.id}>
                  <a>
                    <div className="whitespace-nowrap rounded-full bg-slate-800/30 py-2 px-4 backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-white hover:text-slate-600">
                      {genre.name === "Science Fiction" ? "Sci-Fi" : genre.name}
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto mt-10 px-5 ">
        {production_companies.length >= 1 ? (
          <div className="mb-10 flex space-x-3  overflow-auto pb-3">
            {production_companies.map(({ name, id }) => (
              <div
                key={id}
                className="whitespace-nowrap text-sm text-slate-400"
              >
                {name}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="flex">{status !== "Released" ? status : ""}</div>
        <h2
          className={
            "mb-4 max-w-3xl font-bold " + (tagline ? "text-2xl" : "text-4xl")
          }
        >
          {tagline ? tagline : "Overview"}
        </h2>
        <p className="max-w-3xl leading-6">
          {overview ? overview : "No overview found for this title."}
        </p>

        {recommendations.results.length >= 1 ? (
          <>
            <h2 className="mt-12 mb-4 max-w-3xl text-4xl font-bold">
              Recommendations
            </h2>

            <HorizScroll items={recommendations.results} />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ query }: NextPageContext) {
  const { id } = query;
  if (id === undefined) {
    return { props: null };
  }
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?` +
      stringify({
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
        append_to_response: "recommendations",
      })
  );
  const json = await res.json();

  return { props: { details: json } };
}

interface Props {
  details: MovieDetails;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  release_date: string;
  revenue: string;
  runtime: number;
  status:
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Canceled";
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  recommendations: {
    results: Movie[];
  };
}
