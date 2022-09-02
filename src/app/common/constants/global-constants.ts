import { environment } from "environments/environment";

export class GlobalConstants {
  public static readonly API_URL = environment.apiUrl;
  public static readonly TOKEN_HEADER_KEY = "Authorization";
}
