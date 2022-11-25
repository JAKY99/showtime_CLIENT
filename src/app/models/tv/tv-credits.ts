export interface TvCredits{
  "cast": Array<TvCreditsCast> | null,
  "crew": Array<TvCreditsCrew> | null
}

export interface TvCreditsCast{
  "adult" : Boolean,
  "gender" : number | null,
  "id" : number | null,
  "known_for_department" : string | null,
  "name" : string | null,
  "original_name" : string | null,
  "popularity" :  number | null,
  "character" : string | null,
  "credit_id" : string | null,
  "order" : number | null
}

export interface TvCreditsCrew{
  "adult" : Boolean | null,
  "gender" : number | null,
  "id" : number | null,
  "known_for_department" : string | null,
  "name" : string | null,
  "original_name" : string | null,
  "popularity" : number | null,
  "profile_path" : string | null,
  "credit_id" : string | null,
  "department" : string | null,
  "job" : string | null
}
