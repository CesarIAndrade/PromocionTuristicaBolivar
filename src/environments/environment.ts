// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

// const ip = "26.233.202.189";
// export const apiUrl = `http://${ip}/ApiTurismo/public/api/`;
// export const imagesUrl = `http://${ip}/ApiTurismo/public/DiscoImagenes/`;

const url = "https://calm-waters-32459.herokuapp.com/"
// const url = "http://apiturismo.tonohost.com/laravelApi/public/"
// const url = "http://apiturismo.tonohost.com/ApiTurismo/public/"
export const apiUrl = `${url}api/`;
export const imagesUrl = `${url}DiscoImagenes/`;

// 
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
