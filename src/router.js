import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)



export default new Router({
  linkExactActiveClass: 'is-active',
  routes: [
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
      // this is the route to the register form
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "login" */ './views/Register.vue'),
      meta: {
        requiresVisitor: true,
        layout: "landing",
      }
    },
    {
      // this is the route to logout of the app
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "logout" */ './views/Logout.vue'),
    },
    {
      // this is the dashboard view
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
      // this is the firm overview view
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
      // this is the list of all clients view
      path: '/contacts',
      name: 'contacts',
      component: () => import(/* webpackChunkName: "about" */ './views/Contacts.vue'),
      meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Contacts' }
        ]
      }
    },
    {
      // this is the client account page with tabbable children routes
      path: '/contact/:id',
      name: 'contact-details',
      component: () => import('./views/ContactDetails.vue'),
      meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Contact Details' }
        ]
      },
      children: [          
          {
          // this is the path to view the account of the client
          path: 'account',
          name: 'account',
          component: () => import('@/components/client_detail_tabs/Account.vue'),
            meta: {
              requiresAuth: true,
              breadCrumb: [
                { name: 'Account' }
              ]
            },
            children: [
              {
                 // this is the path to edit contact
                 path: 'edit',
                 component: () => import('@/components/EditContact.vue'),
                   meta: {
                     requiresAuth: true,
                     breadCrumb: [
                       { name: 'Edit Contact' }
                     ]
                   },
              }
            ]
          },
          {
          // this is the path to view the engagements that belong to the client
          path: 'engagements',
          component: () => import('@/components/client_detail_tabs/ContactEngagements.vue'),
            meta: {
              requiresAuth: true,
              breadCrumb: [
                { name: 'Engagements' }
              ]
            },
            children: [
              {
                // this is the path to add an engagement to singel client
                path: 'add-engagement',
                component: () => import('@/components/client_detail_tabs/AddEngagement.vue'),
                  meta: {
                    requiresAuth: true,
                    breadCrumb: [
                      { name: 'Add Engagement' }
                    ]
                  },
                },
            ],
          },
          {
          // this is the path to view the files belonging to client
          path: 'files',
          component: () => import('@/components/client_detail_tabs/Files.vue'),
            meta: {
              requiresAuth: true,
              breadCrumb: [
                { name: 'Files' }
              ]
            },
          },
          {
          // this is the path to view the notes belonging to client
            path: 'notes',
            component: () => import('@/components/client_detail_tabs/Notes.vue'),
            meta: {
              requiresAuth: true,
              breadCrumb: [
                { name: 'Notes' }
              ]
            },
          },
          {
          // this is the path to view the pending belonging to the client
          path: 'pending',
          component: () => import('@/components/client_detail_tabs/Pending.vue'),
            meta: {
              requiresAuth: true,
              breadCrumb: [
                { name: 'Pending' }
              ]
            },
          },
          {
            // this is the path to view the portal belonging to the client
            path: 'portal',
            component: () => import('@/components/client_detail_tabs/Portal.vue'),
            meta: {
              requiresAuth: true,
              breadCrumb: [
                { name: 'Portal' }
              ]
            },
          }
      ],
    },
    {
      // this is the path for adding a contact or engagement globally
      path: '/add',
      name: 'add',
      component: () => import(/* webpackChunkName: "add" */ './views/Add.vue'),
      meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Add New' }
        ]
      },
      children: [
        {
          // this is the children route for adding a new contact
          path: 'contact',
          component: () => import('@/components/ContactForm.vue'),
            meta: {
              requiresAuth: true,
              breadCrumb: [
                { name: 'New Contact' }
            ]
          },
        },
        {
          // this is the children route for adding a new engagement
          path: 'engagement',
          component: () => import('@/components/EngagementForm.vue'),
            meta: {
              requiresAuth: true,
              breadCrumb: [
                { name: 'New Engagement' }
            ]
          },
        }
      ]
    },
    {
      // this is the path to view the tasks belonging to a user
      path: '/tasks',
      name: 'tasks',
      component: () => import(/* webpackChunkName: "tasks" */ './views/Tasks.vue'),
      meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Tasks' }
        ]
      }
    },
    {
      // this is the path to view the list of all engagements
    path: '/engagements',
    name: 'engagements',
    component: () => import(/* webpackChunkName: "accounts" */ './views/Engagements.vue'),
    meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Engagements' }
        ]
      }
    },
    {
    //this is the route to view single engagement
    path: '/engagement/:id',
    name: 'engagement-details',
    component: () => import(/* webpackChunkName: "accounts" */ './views/EngagementDetails.vue'),
    meta: {
        requiresAuth: true,
        breadCrumb: [
          { name: 'Engagement Details' }
        ]
      },
    children: [
      {
        path: 'edit',
        component: () => import('@/components/EditEngage.vue'),
          meta: {
            requiresAuth: true,
            breadCrumb: [
              { name: 'Edit Engagement' }
          ]
        },
      },
      {
        path: 'add-question',
        component: () => import('@/components/AddQuestion.vue'),
          meta: {
            requiresAuth: true,
            breadCrumb: [
              { name: 'Add Question' }
          ]
        },
      }
    ]
    },
  ],
  mode: 'history',
})


