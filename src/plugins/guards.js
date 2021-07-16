import store from '../store/store';
import { storeHistory } from './helpers';
//use this guard in various route files such as administrator.js
//only admins can access routes protected by this guard
// localstorage item is set set at login in the auth.js file
export function routeAdminGuard(to,from,next) {
        if (to.matched.some(record => record.meta.requiresAuth)) { 
        var token = localStorage.getItem('access_token')
        if (!token || token == null || token == undefined ) {
            next({
            path: '/login',
            })
        } else if(localStorage.getItem('role') != 'Admin') {
            next(from.path)
        } else {
            next()
        }
    }
}

//use this guard in various route files such as addnew.js
//users with roles of outsource are not allowed to view routes with this guard
// localstorage item is set set at login in the auth.js file
export function routeOutsourceGuard(to,from,next) {
        if (to.matched.some(record => record.meta.requiresAuth)) { 
        var token = localStorage.getItem('access_token')
        if (!token || token == null || token == undefined ) {
            next({
            path: '/login',
            })
        } else if(localStorage.getItem('role') == 'Outsource') {
            next(from.path)
        } else {
            next()
        }
    }
}

// use this globally for each route
// imported into main.js file
// checks weather the user is logged in or not and what should happen depending on the route meta data
// requires visitor only allows those that are not logged in to view
// requires auth only allows routes that contain the requires auth meta and is logged in
// password reset is always allowed to be viewed however requires token in which is checked on that view passwordreset.vue
export function beforeEachCustom(to, from, next) {
    storeHistory(from)
    if (to.matched.some(record => record.meta.requiresAuth)) {
      var token = store.getters.loggedIn;
      if (!token || token == null || token == undefined ) {
        next({
          path: '/login',
        })
      } else {
        next()
      }
    }else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (token || token != null || token != undefined) {
        next({
          path: '/',
        })
      } else {
        next()
      }
    } else if(to.matched.some(record => record.meta.passwordReset)) {
      if(token || !token) {
        next()
      }
    }
}
