// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  EndPointAPI: 'https://radiant-stream-23882.herokuapp.com',
  // EndPointAPI: 'http://localhost:3000',

  APIPrefix: '/api',
  APIVersion: '/v1',

  //brand
  APIBrand: '/brand',

  //menu
  APIMenu: '/menu',

  //slider
  APISlider: '/slider',

  //product
  APIProduct: '/product',

  //user
  APIUserLogin: '/user/login',
  APIUserRegister: '/user/register',

  //order
  APICreateOrder: '/order',
  APIOrderDetail: '/order/detail',
  //search
  APISearchProduct: '/search',
  //check token
  APICheckToken: '/checktoken',
  //posts
  APIPosts: '/posts',
  APIPostDetail: '/post',
  //comment
  APIComments:'/comments'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
