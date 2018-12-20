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
      path: '/administrator',
      name: 'administrator',
      component: () => import(/* webpackChunkName: "logout" */ './views/Administrator.vue'),
      meta: {
        requiresAuth: true,
        layout: "admin",
      },
      children: [
          {
          path: 'account',
          name: 'app-account',
          component: () => import('@/children/Account.vue'),
            meta: {
              requiresAuth: true,
              layout: "admin",
            },
            children: [
              {
                path: 'edit-account',
                name: 'edit-account',
                component: () => import('@/children/EditAccount'),
                meta: {
                  requiresAuth: true,
                  layout: "admin"
                }
              },
              {
                path: 'add-account',
                name: 'add-account',
                component: () => import('@/children/AddAccount'),
                meta: {
                  requiresAuth: true,
                  layout: "admin"
                }
              },
            ]
          },
          {
          path: 'workflows',
          name: 'workflows',
          component: () => import('@/children/Workflows.vue'),
            meta: {
              requiresAuth: true,
              layout: "admin",
            },
            children: [
              {
                path: 'edit-workflow/:workflow',
                name: 'edit-workflow',
                component: () => import('@/children/EditWorkflow.vue'),
                meta: {
                  requiresAuth: true,
                  layout: "admin",
                },
              }
            ]
          },
          {
            path: 'users',
            name: 'users',
            component: () => import('@/children/Users.vue'),
            meta: {
              requiresAuth: true,
              layout: "admin",
            },
            children: [
              {
                path: 'edit-user/:id',
                name: 'edit-user',
                component: () => import('@/children/EditUser.vue'),
                meta: {
                  requiresAuth: true,
                  layout: "admin"
                }
              }
            ]
          },
          {
            path: 'add-user',
            name: 'add-user',
            component: () => import('@/children/AddUser.vue'),
              meta: {
                requiresAuth: true,
                layout: "admin",
              },
          },
      ] 
    },
    {
      // this is the dashboard view
      path: '/',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
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
      meta: {
        requiresAuth: true,
        layout: "default",
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
        layout: "default",
        breadCrumb: [
          { name: 'Contact Details' }
        ]
      },
      children: [          
          {
          // this is the path to view the account of the client
          path: 'account',
          name: 'account',
          component: () => import('@/contact/Account.vue'),
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
              component: () => import('@/children/EditContact.vue'),
                meta: {
                  requiresAuth: true,
                  breadCrumb: [
                    { name: 'Edit Contact' }
                  ]
                },
              },
              {
              // this is the path to add dependent
              path: 'add-dependent',
              component: () => import('@/children/AddDependent.vue'),
                meta: {
                  requiresAuth: true,
                  breadCrumb: [
                    { name: 'Add Dependent' }
                  ]
                },
              },
              {
              // this is the path to edit dependent
              path: 'edit-dependent/:dependent',
              component: () => import('@/children/EditDepend.vue'),
                meta: {
                  requiresAuth: true,
                  breadCrumb: [
                    { name: 'Edit Dependent' }
                  ]
                },
              },
              {
              // this is the path to add dependent
              path: 'add-business',
              component: () => import('@/children/AddBusiness.vue'),
                meta: {
                  requiresAuth: true,
                  breadCrumb: [
                    { name: 'Add Business' }
                  ]
                },
              },
              {
              // this is the path to add dependent
              path: 'edit-business/:business',
              component: () => import('@/children/EditBusiness.vue'),
                meta: {
                  requiresAuth: true,
                  breadCrumb: [
                    { name: 'Edit Business' }
                  ]
                },
              },
            ]
          },
          {
          // this is the path to view the engagements that belong to the client
          path: 'engagements',
          name: 'contact-engagements',
          component: () => import('@/contact/ContactEngagements.vue'),
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
                component: () => import('@/children/AddEngagement.vue'),
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
          component: () => import('@/contact/Files.vue'),
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
            name: 'notes',
            component: () => import('@/contact/Notes.vue'),
            meta: {
              requiresAuth: true,
              breadCrumb: [
                { name: 'Notes' }
                ],
              },
              children: [
                {
                  path: 'add-note',
                  component: () => import('@/children/AddNote.vue'),
                    meta: {
                      requiresAuth: true,
                      breadCrumb: [
                        { name: 'Add Note' }
                      ]
                  },
                },
                {
                  path: 'edit-note/:note',
                  component: () => import('@/children/EditNote.vue'),
                    meta: {
                      requiresAuth: true,
                      breadCrumb: [
                        { name: 'Edit Note' }
                      ]
                  },
                },
              ],
          },
          {
          // this is the path to view the pending belonging to the client
          path: 'pending',
          component: () => import('@/contact/Pending.vue'),
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
            component: () => import('@/contact/Portal.vue'),
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
        layout: "default",
        breadCrumb: [
          { name: 'Add New' }
        ]
      },
      children: [
        {
          // this is the children route for adding a new contact
          path: 'contact',
          component: () => import('@/children/ContactForm.vue'),
            meta: {
              requiresAuth: true,
              breadCrumb: [
                { name: 'New Contact' }
            ]
          },
        },
        {
          // this is the children route for adding a new contact
          path: 'business',
          component: () => import('@/children/BusinessForm.vue'),
            meta: {
              requiresAuth: true,
              breadCrumb: [
                { name: 'New Business' }
            ]
          },
        },
        {
          // this is the children route for adding a new engagement
          path: 'engagement',
          component: () => import('@/children/EngagementForm.vue'),
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
    meta: {
        requiresAuth: true,
        layout: "default",
        breadCrumb: [
          { name: 'Engagements' }
        ]
      }
    },
    {
    //this is the route to view single engagement
    path: '/engagement/:id',
    name: 'engagement-details',
    component: () => import(/* webpackChunkName: "engagement-details" */ './views/EngagementDetails.vue'),
    meta: {
        requiresAuth: true,
        layout: "default",
        breadCrumb: [
          { name: 'Engagement Details' }
        ]
      },
    children: [
      {
        path: 'edit',
        component: () => import('@/children/EditEngage.vue'),
          meta: {
            requiresAuth: true,
            breadCrumb: [
              { name: 'Edit Engagement' }
          ]
        },
      },
      {
        path: 'add-question',
        component: () => import('@/children/AddQuestion.vue'),
          meta: {
            requiresAuth: true,
            breadCrumb: [
              { name: 'Add Question' }
          ]
        },
      },
      {
        path: 'edit-question/:question',
        component: () => import('@/children/EditQuest.vue'),
          meta: {
            requiresAuth: true,
            breadCrumb: [
              { name: 'Edit Question' }
          ]
        },
      },
      {
        path: 'answer-question/:question',
        component: () => import('@/children/AnswerQuest.vue'),
          meta: {
            requiresAuth: true,
            breadCrumb: [
              { name: 'Answer Question' }
          ]
        },
      }
    ]
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
  ],
  mode: 'history',
})


