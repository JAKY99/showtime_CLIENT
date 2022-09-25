import {MovieCredits} from "./movie-credits";
import {Trailer} from "../common/trailer";

export interface MovieDetailsModel {
  "adult": boolean,
  "backdrop_path": string,
  "belongs_to_collection": {
    "id": number | null,
    "name": string | null,
    "poster_path": string | null,
    "backdrop_path": string | null
  },
  "budget": number | null,
  "genres": Array<any>,
  "homepage": string,
  "id": number | null,
  "imdb_id": string | null,
  "original_language": string | null,
  "original_title": string | null,
  "overview": string | null,
  "popularity": number | null,
  "poster_path": string | null,
  "production_companies": Array<any> | null,
  "production_countries": Array<any> | null,
  "release_date": string | null,
  "revenue": number | null,
  "runtime": number | null,
  "spoken_languages": Array<any> | null,
  "status": string | null,
  "tagline": string | null,
  "title": string | null,
  "video": false,
  "vote_average": number | null,
  "vote_count": number | null,
  "credits": MovieCredits,
  "images": Object | null,
  "videos":{
    "results": Array<Trailer>
  } ,
  "content_type": number,
}
