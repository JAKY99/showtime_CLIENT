import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserLocationDatasService {

  constructor(private http: HttpClient) { }

  fetchLocationData(): Observable<any> {
    let url = "https://api.ipgeolocation.io/ipgeo?apiKey=a6dc28f69fb84a1193b0561cd77a41e0";
    return this.http.get<any>(url);
  }

  emulateLocation(){
    let resp = {
      "ip": "2a02:842b:5d5:6001:f883:7142:fc0a:1dcc",
      "continent_code": "EU",
      "continent_name": "Europe",
      "country_code2": "FR",
      "country_code3": "FRA",
      "country_name": "France",
      "country_capital": "Paris",
      "state_prov": "Ile-de-France",
      "district": "",
      "city": "Paris",
      "zipcode": "75015",
      "latitude": "48.83597",
      "longitude": "2.27389",
      "is_eu": true,
      "calling_code": "+33",
      "country_tld": ".fr",
      "languages": "fr-FR,frp,br,co,ca,eu,oc",
      "country_flag": "https://ipgeolocation.io/static/flags/fr_64.png",
      "geoname_id": "9177897",
      "isp": "LDCOMNET",
      "connection_type": "",
      "organization": "Societe Francaise Du Radiotelephone - SFR SA",
      "currency": {
        "code": "EUR",
        "name": "Euro",
        "symbol": "€"
      },
      "time_zone": {
        "name": "Europe/Paris",
        "offset": 1,
        "current_time": "2023-05-17 15:01:52.252+0200",
        "current_time_unix": 1684328512.252,
        "is_dst": true,
        "dst_savings": 1
      }
    }
    return resp;
  }
}
