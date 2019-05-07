import store from '../store/store';

//use this guard in various route files such as administrator.js
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

//use this guard in various route files such as administrator.js
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
export function beforeEachCustom(to, from, next) {
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
