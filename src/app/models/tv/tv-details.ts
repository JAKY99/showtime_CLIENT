import {TvCreatedBy} from "./tv-created-by";
import {Genre} from "../common/genre";
import {NetworkDetails} from "../network/network-details";
import {ProductionCompany} from "../common/production-company";
import {ProductionCountry} from "../common/production-country";
import {TvSeasonDetails} from "./tv-season-details";
import {SpokenLanguage} from "../common/spoken-language";

export interface TvDetails {
  "backdrop_path": string,
  "created_by": Array<TvCreatedBy>,
  "episode_run_time": Array<number>,
  "first_air_date": string,
  "genres": Array<Genre>,
  "homepage": string,
  "id": number,
  "in_production": boolean,
  "languages": Array<string>,
  "last_air_date": string,
  "last_episode_to_air": {
    "air_date": string,
    "episode_number": number,
    "id": number,
    "name": string,
    "overview": string,
    "production_code": string,
    "season_number": number,
    "still_path": string,
    "vote_average": number,
    "vote_count": number
  },
  "name": string,
  "next_episode_to_air": any,
  "networks": Array<NetworkDetails>,
  "number_of_episodes": number,
  "number_of_seasons": number,
  "origin_country": Array<string>,
  "original_language": string,
  "original_name": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "production_companies": Array<ProductionCompany>,
  "production_countries": Array<ProductionCountry>,
  "seasons": Array<TvSeasonDetails>,
  "spoken_languages": Array<SpokenLanguage>,
  "status": string,
  "tagline": string,
  "type": string,
  "vote_average": number,
  "vote_count": number
}
