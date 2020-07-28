// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  API: 'http://localhost:3000/',
  firebase: {
    apiKey: 'AIzaSyC0WzoeylMBXxO4UEjXzHN2ncFydq8rSH0',
    authDomain: 'projetobarbershop-1620.firebaseapp.com',
    databaseURL: 'https://projetobarbershop-1620.firebaseio.com',
    projectId: 'projetobarbershop-1620',
    storageBucket: '',
    messagingSenderId: '1004432841462'
}
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
