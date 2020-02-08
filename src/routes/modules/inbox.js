import { routeOutsourceGuard } from '../../plugins/guards.js'

export default [
{
    path: '/inbox',
    name: 'inbox',
    component: () => import(/* webpackChunkName: "add" */ '../../views/Inbox.vue'),
    beforeEnter: routeOutsourceGuard,
    meta: {
        requiresAuth: true,
        layout: "default",
        breadCrumb: [
            { name: 'Inbox Manager' }
        ]
    }
}
]