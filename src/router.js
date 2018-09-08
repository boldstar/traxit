import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)



export default new Router({
  linkExactActiveClass: 'is-active',
  routes: [
    {
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
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "login" */ './views/Register.vue'),
      meta: {
        requiresVisitor: true,
        layout: "landing",
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "logout" */ './views/Logout.vue'),
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
      meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Dashboard' }
        ]
      }
    },
    {
      path: '/firm',
      name: 'firm',
      component: () => import(/* webpackChunkName: "firm" */ './views/Firm.vue'),
      meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Firm' }
        ]
      }
    },
    {
      path: '/clients',
      name: 'clients',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Clients.vue'),
      meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Contacts' }
        ]
      }
    },
    {
      path: '/client/:id',
      name: 'client-details',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "client-details" */ './views/ClientDetails.vue'),
      meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Contact Details' }
        ]
      }
    },
    {
      path: '/add',
      name: 'add',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "add" */ './views/Add.vue'),
      meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Add Contact' }
        ]
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "tasks" */ './views/Tasks.vue'),
      meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Tasks' }
        ]
      }
    },
    {
    path: '/accounts',
    name: 'accounts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "accounts" */ './views/Accounts.vue'),
    meta: {
      requiresAuth: true,
      breadCrumb: [
        { name: 'Accounts' }
      ]
    }
    },
  ],
  mode: 'history',
})


