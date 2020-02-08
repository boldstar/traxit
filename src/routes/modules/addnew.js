import { routeOutsourceGuard } from '../../plugins/guards.js'

export default [
{
    // this is the path for adding a contact or engagement globally
    path: '/add',
    name: 'add',
    component: () => import(/* webpackChunkName: "add" */ '../../views/Add.vue'),
    beforeEnter: routeOutsourceGuard,
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
        component: () => import('@/children/add/ContactForm.vue'),
            meta: {
            layout: "default",
            requiresAuth: true,
            breadCrumb: [
                { name: 'New Contact' }
            ]
        },
        },
        {
        // this is the children route for adding a new contact
        path: 'business',
        component: () => import('@/children/add/BusinessForm.vue'),
            meta: {
            layout: "default",
            requiresAuth: true,
            breadCrumb: [
                { name: 'New Business' }
            ]
        },
        },
        {
        // this is the children route for adding a new engagement
        path: 'engagement/form',
        component: () => import('@/children/add/StartEngagementForm.vue'),
            meta: {
            layout: "default",
            requiresAuth: true,
            breadCrumb: [
                { name: 'New Engagement' }
            ]
        },
        },
        {
        // this is the children route for adding a new engagement
        path: 'engagement/taxform',
        component: () => import('@/children/add/TaxForm.vue'),
            meta: {
            layout: "default",
            requiresAuth: true,
            breadCrumb: [
                { name: 'New Tax Engagement' }
            ]
        },
        },
        {
        // this is the children route for adding a new engagement
        path: 'engagement/bookkeepingform',
        component: () => import('@/children/add/BookForm.vue'),
            meta: {
            layout: "default",
            requiresAuth: true,
            breadCrumb: [
                { name: 'New Bookkeeping Engagement' }
            ]
        },
        },
        {
        // this is the children route for adding a new engagement
        path: 'engagement/customform',
        component: () => import('@/children/add/CustomForm.vue'),
            meta: {
            layout: "default",
            requiresAuth: true,
            breadCrumb: [
                { name: 'New Custom Engagement' }
            ]
        },
        }
    ]
    },
]
