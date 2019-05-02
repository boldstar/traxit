
export function routeGuard(to,from,next) {
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
