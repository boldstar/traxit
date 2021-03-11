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
        component: () => import('@/children/admin/Account.vue'),
            meta: meta,
            children: [
            {
                path: 'edit-account',
                name: 'edit-account',
                component: () => import('@/children/admin/EditAccount'),
                meta: meta
            },
            {
                path: 'add-account',
                name: 'add-account',
                component: () => import('@/children/admin/AddAccount'),
                meta: meta
            },
            ]
        },
        {
            path: 'subscription',
            name: 'subscription',
            component: () => import('@/children/admin/Subscription.vue'),
            meta: meta,
            children: [
            {
                path: 'plans',
                name: 'plans',
                component: () => import('@/children/admin/Plans.vue'),
                meta: meta,
            },
            {
                path: 'update-card',
                name: 'update-card',
                component: () => import('@/children/admin/ChangeCard.vue'),
                meta: meta,
            },
            ]
        },
        {
        path: 'workflows',
        name: 'workflows',
        component: () => import('@/children/admin/Workflows.vue'),
            meta: meta,
            children: [
            {
                path: 'edit-workflow/:workflow',
                name: 'edit-workflow',
                component: () => import('@/children/admin/EditWorkflow.vue'),
                meta: meta,
            }
            ]
        },
        {
            path: 'team',
            name: 'team',
            component: () => import('@/children/admin/Team.vue'),
            meta: meta,
            children: [
            {
                path: 'user/:user',
                name: 'user',
                component: () => import('@/children/admin/UserCrud.vue'),
                meta: meta
            }
            ]
        },
        {
            path: 'reports',
            name: 'reports',
            component: () => import('@/children/admin/Reports.vue'),
            meta: meta
        },
        {
            path: 'templates',
            name: 'templates',
            component: () => import('@/children/admin/Templates.vue'),
            meta: meta,
        },
        {
            path: 'customizations',
            name: 'customizations',
            component: () => import('@/children/admin/Customizations.vue'),
            meta: meta,
        },
    ]
    },
]
