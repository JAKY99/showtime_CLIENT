export interface WatchProvider {
  "link": string,
  "flatrate": Array<Provider> | null,
  "rent": Array<Provider> | null,
  "buy": Array<Provider> | null,
}

export interface Provider{
  "display_priority": number,
  "logo_path": string | null,
  "provider_id": number,
  "provider_name": string
}
