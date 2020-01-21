import Vue from 'vue'
import Router from 'vue-router'
import engagements from './routes/modules/engagements'
import addnew from './routes/modules/addnew'
import administrator from './routes/modules/administrator'
import contact from './routes/modules/contact'
import inbox from './routes/modules/inbox'
import { routeOutsourceGuard } from './plugins/guards.js'

Vue.use(Router)

const baseRoutes = [
  {
    // this is the route for logging in to the app
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    props: true,
    meta: {
      requiresVisitor: true,
      layout: "landing",
    },
  },
  {
    // this is the route for logging in to the app
    path: '/get-reset-link',
    name: 'get-reset-link',
    component: () => import(/* webpackChunkName: "login" */ './views/EmailReset.vue'),
    props: true,
    meta: {
      requiresVisitor: true,
      layout: "landing",
    },
  },
  {
    // this is the route for logging in to the app
    path: '/reset-password/:token',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "login" */ './views/Reset.vue'),
    props: true,
    meta: {
      passwordReset: true,
      layout: "reset",
    },
  },
  {
    // this is the dashboard view
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    beforeEnter: routeOutsourceGuard,
    meta: {
      requiresAuth: true,
      layout: "default",
      breadCrumb: [
        { name: 'Dashboard' }
      ]
    }
  },
  {
    // this is the firm overview view
    path: '/firm',
    name: 'firm',
    component: () => import(/* webpackChunkName: "firm" */ './views/Firm.vue'),
    beforeEnter: routeOutsourceGuard,
    meta: {
      requiresAuth: true,
      layout: "default",
      breadCrumb: [
        { name: 'Firm' }
      ]
    },
  },
  {
    // this is the list of all clients view
    path: '/contacts',
    name: 'contacts',
    component: () => import(/* webpackChunkName: "about" */ './views/Contacts.vue'),
    beforeEnter: routeOutsourceGuard,
    meta: {
      requiresAuth: true,
      layout: "default",
      breadCrumb: [
        { name: 'Contacts' }
      ]
    }
  },
  {
    // this is the path to view the tasks belonging to a user
    path: '/tasks',
    name: 'tasks',
    component: () => import(/* webpackChunkName: "tasks" */ './views/Tasks.vue'),
    meta: {
      requiresAuth: true,
      layout: "default",
      breadCrumb: [
        { name: 'Tasks' }
      ]
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "tasks" */ './views/Profile.vue'),
    meta: {
      requiresAuth: true,
      layout: "default",
      breadCrumb: [
        { name: 'Profile' }
      ]
    }
  },
  {
    // this is the path to view the list of all engagements
  path: '/engagements',
  name: 'engagements',
  component: () => import(/* webpackChunkName: "engagements" */ './views/Engagements.vue'),
  beforeEnter: routeOutsourceGuard,
  meta: {
      requiresAuth: true,
      layout: "default",
      breadCrumb: [
        { name: 'Engagements' }
      ]
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ './views/Search.vue'),
    meta: {
        requiresAuth: true,
        layout: "default",
        breadCrumb: [
          { name: 'Search' }
        ]
      }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ './components/404.vue'),
    meta: {
      passwordReset: true,
      layout: "reset",
    },
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const routes = baseRoutes.concat(engagements, addnew, administrator, contact, inbox)


export default new Router({
  linkExactActiveClass: 'is-active',
  routes,
  mode: 'history',
})


