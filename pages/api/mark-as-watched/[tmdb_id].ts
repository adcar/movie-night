import type { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "query-string";
import { supabase } from "../../../utils/supabase";
import { trakt } from "../../../utils/trakt";

type Data = {
  error?: string;
  name?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tmdbId = parseInt(req.query.tmdb_id as string);

  if (isNaN(tmdbId)) {
    return res.status(500).json({ error: "Invalid tmdb_id" });
  }

  const searchResults = await trakt.search.id({
    id_type: "tmdb",
    id: tmdbId,
  });

  const traktResult = searchResults[0];

  if (!traktResult || traktResult.type !== "movie") {
    return res
      .status(500)
      .json({ error: "No Trakt ID found for this TMDB id" });
  }

  const movie = traktResult.movie;

  const response = await supabase.from("movie").insert([
    {
      title: movie.title,
      year: movie.year,
      tmdb_id: tmdbId,
      trakt_id: movie.ids.trakt,
      imdb_id: movie.ids.trakt,
    },
  ]);

  // if (!data) {
  //   // Data must already be in the DB
  //   const selectResponse = await supabase
  //     .from("movie")
  //     .select("*")

  //     // Filters
  //     .eq("tmdb_id", tmdbId);
  //   console.log(selectResponse);
  // }

  const user = supabase.auth.api.getUserByCookie();
  const { data, error } = await supabase
    .from("watched_movies")
    .upsert({ user_id: "someValue" });

  //const { id } = data[0];

  //console.log(id);
  //console.log(data);
  //console.log(error);

  return res.status(200).json({ name: "cool" });
}
