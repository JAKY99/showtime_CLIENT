import {TvCredits} from "./tv-credits";

export interface TvEpisodeDetails {
  "air_date": string,
  "crew": Array<TvCredits>,
  "name" : string,
  "overview" :  string,
  "id" : number,
  "episode_number" : number,
  "production_code" : string | null,
  "season_number" : number,
  "still_path" : string | null
  "vote_average":  number,
  "vote_count" : number
}
