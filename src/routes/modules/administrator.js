export default [
{
    path: '/administrator',
    name: 'administrator',
    component: () => import(/* webpackChunkName: "logout" */ '../../views/Administrator.vue'),
    beforeEnter: (to, from, next) => {
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
    },
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
            path: 'subscription',
            name: 'subscription',
            component: () => import('@/children/Subscription.vue'),
            meta: {
            requiresAuth: true,
            layout: "admin"
            },
            children: [
            {
                path: 'plans',
                name: 'plans',
                component: () => import('@/children/Plans.vue'),
                meta: {
                requiresAuth: true,
                layout: "admin"
                },
            },
            {
                path: 'update-card',
                name: 'update-card',
                component: () => import('@/children/ChangeCard.vue'),
                meta: {
                requiresAuth: true,
                layout: "admin"
                },
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
            path: 'team',
            name: 'team',
            component: () => import('@/children/Team.vue'),
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
        {
            path: 'reports',
            name: 'reports',
            component: () => import('@/children/Reports.vue'),
            meta: {
                requiresAuth: true,
                layout: "admin",
            },
        },
        {
            path: 'templates',
            name: 'templates',
            component: () => import('@/children/Templates.vue'),
            meta: {
                requiresAuth: true,
                layout: "admin",
            },
            children: [
                {
                path: 'edit-template/:template',
                name: 'edit-template',
                component: () => import('@/children/EditTemplate.vue'),
                meta: {
                    requiresAuth: true,
                    layout: "admin",
                },
                }
            ]
            },
    ]
    },
]
