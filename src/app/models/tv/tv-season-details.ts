import {TvEpisodeDetails} from "./tv-episode-details";

export interface TvSeasonDetails {
  "_id": string,
  "air_date": string,
  "episode_count": number,
  "episodes": Array<TvEpisodeDetails>,
  "name": string,
  "overview": string,
  "id": number,
  "poster_path": string,
  "season_number": number
}
