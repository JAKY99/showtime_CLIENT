export interface People {
  "birthday": String,
  "known_for_department": String,
  "deathday": String | null,
  "id": number,
  "name": String,
  "also_known_as": Array<String>,
  "gender": number,
  "biography": Text,
  "popularity": number,
  "place_of_birth": number,
  "profile_path": number,
  "adult": boolean,
  "imdb_id": number,
  "homepage": String | null
}
