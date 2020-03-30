import { routeOutsourceGuard } from '../../plugins/guards.js'

export default [
    {
        // this is the firm overview view
        path: '/firm',
        name: 'firm',
        component: () => import(/* webpackChunkName: "firm" */ '../../views/Firm.vue'),
        beforeEnter: routeOutsourceGuard,
        meta: {
        requiresAuth: true,
        layout: "default",
        breadCrumb: [
            { name: 'Firm' }
        ]
        },
        children: [
          {
            path: 'workflow-overview',
            name: 'workflow-overview',
            component: () => import('@/children/firm/Workflows.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Workflow Overview' }
              ]
            },
          },
          {
            path: 'bookkeeping-overview',
            name: 'bookkeeping-overview',
            component: () => import('@/children/firm/Bookkeeping.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Bookkeeping Overview' }
              ]
            },
          },
          {
            path: 'taxreturns-overview',
            name: 'taxreturns-overview',
            component: () => import('@/children/firm/TaxReturns.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Tax Returns Overview' }
              ]
            },
          },
          {
            path: 'team-overview',
            name: 'team-overview',
            component: () => import('@/children/firm/TeamOverview.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Team Overview' }
              ]
            },
          },
        ]
      },
]
