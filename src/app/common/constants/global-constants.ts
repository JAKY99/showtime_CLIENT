import { environment } from "environments/environment";

export class GlobalConstants {
  public static readonly API_URL = environment.apiUrl;
  public static readonly TOKEN_HEADER_KEY = "Authorization";

  public static readonly TMDB_BASE_URL = "https://api.themoviedb.org/3/";
  public static readonly TMDB_KEY = "268e205e4732543417f057b681731e09";

  public static readonly TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  public static readonly FLAG_ICON_BASE_URL = "https://countryflagsapi.com/png/";
  public static readonly WEBSOCKET_URL = environment.webSocketUrl;
  public static readonly ENV = environment.env;
  public static readonly GOOGLE_LOGIN_URI = environment.google_login_uri;
}
