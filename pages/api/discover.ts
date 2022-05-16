// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "query-string";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let genreId: number;
  let sortBy: string;
  if (!req.query.genre) {
    genreId = 0;
  } else {
    genreId = parseInt(req.query.genre as string);
  }

  if (!req.query.sort_by) {
    sortBy = "popularity.desc";
  } else {
    sortBy = req.query.sort_by as string;
  }

  let page: number;
  if (!req.query.page) {
    page = 1;
  } else {
    page = parseInt(req.query.page as string);
  }

  const withGenre = genreId !== 0 ? stringify({ with_genres: genreId }) : "";

  const date = new Date().toISOString().slice(0, 10);

  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?" +
      stringify({
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
        sort_by: sortBy,
        include_adult: false,
        include_video: false,
        "release_date.lte": date,
        "vote_count.gte":
          sortBy === "vote_average.desc" || sortBy === "vote_average.asc"
            ? 50
            : 5,
        page: page + 1,
      }) +
      "&" +
      withGenre
  );

  const json = await response.json();

  res.status(200).json(json.results);
}
