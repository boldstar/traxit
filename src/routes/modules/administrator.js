import { routeAdminGuard } from '../../plugins/guards.js'
const meta = {
    requiresAuth: true,
    layout: "admin",
}

export default [
{
    path: '/administrator',
    name: 'administrator',
    component: () => import(/* webpackChunkName: "logout" */ '../../views/Administrator.vue'),
    beforeEnter: routeAdminGuard,
    meta: meta,
    children: [
        {
        path: 'account',
        name: 'app-account',
        component: () => import('@/children/Account.vue'),
            meta: meta,
            children: [
            {
                path: 'edit-account',
                name: 'edit-account',
                component: () => import('@/children/EditAccount'),
                meta: meta
            },
            {
                path: 'add-account',
                name: 'add-account',
                component: () => import('@/children/AddAccount'),
                meta: meta
            },
            ]
        },
        {
            path: 'subscription',
            name: 'subscription',
            component: () => import('@/children/Subscription.vue'),
            meta: meta,
            children: [
            {
                path: 'plans',
                name: 'plans',
                component: () => import('@/children/Plans.vue'),
                meta: meta,
            },
            {
                path: 'update-card',
                name: 'update-card',
                component: () => import('@/children/ChangeCard.vue'),
                meta: meta,
            },
            ]
        },
        {
        path: 'workflows',
        name: 'workflows',
        component: () => import('@/children/Workflows.vue'),
            meta: meta,
            children: [
            {
                path: 'edit-workflow/:workflow',
                name: 'edit-workflow',
                component: () => import('@/children/EditWorkflow.vue'),
                meta: meta,
            }
            ]
        },
        {
            path: 'team',
            name: 'team',
            component: () => import('@/children/Team.vue'),
            meta: meta,
            children: [
            {
                path: 'edit-user/:id',
                name: 'edit-user',
                component: () => import('@/children/EditUser.vue'),
                meta: meta
            }
            ]
        },
        {
            path: 'add-user',
            name: 'add-user',
            component: () => import('@/children/AddUser.vue'),
            meta: meta
        },
        {
            path: 'reports',
            name: 'reports',
            component: () => import('@/children/Reports.vue'),
            meta: meta
        },
        {
            path: 'templates',
            name: 'templates',
            component: () => import('@/children/Templates.vue'),
            meta: meta,
        },
    ]
    },
]
