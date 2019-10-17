import { routeOutsourceGuard } from '../../plugins/guards.js'

export default [
{
    path: '/files',
    name: 'files',
    component: () => import(/* webpackChunkName: "add" */ '../../views/Files.vue'),
    beforeEnter: routeOutsourceGuard,
    meta: {
        requiresAuth: true,
        layout: "default",
        breadCrumb: [
            { name: 'File Manager' }
        ]
    }
}
]