export interface MovieCredits{
  "cast": Array<MovieCreditsCast> | null,
  "crew": Array<MovieCreditsCrew> | null
}

export interface MovieCreditsCast {
  "adult": Boolean | null,
  "gender": number| null,
  "id": number| null,
  "known_for_department": string| null,
  "name": string| null,
  "original_name": string| null,
  "popularity": number| null,
  "profile_path": string| null,
  "cast_id": number| null,
  "character": string| null,
  "credit_id": string| null,
  "order": number| null
}

export interface MovieCreditsCrew {
  "adult": Boolean | null,
  "credit_id": number | null,
  "department": string | null,
  "gender": number | null,
  "id": number | null,
  "job": string | null,
  "known_for_department": string | null,
  "name": string | null,
  "original_name": string | null,
  "popularity": number | null,
  "profile_path": string | null
}
