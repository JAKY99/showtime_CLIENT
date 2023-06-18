// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8082',
  webSocketUrl: 'http://localhost:8082/websocket',
  // apiUrl: 'http://10.0.2.2:8082',
  // webSocketUrl: 'http://10.0.2.2:8082/websocket',
  env: 'local',
  google_login_uri: 'http://localhost:8082/api/v1/login/google',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
