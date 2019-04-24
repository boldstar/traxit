export default [
{
    // this is the path for adding a contact or engagement globally
    path: '/add',
    name: 'add',
    component: () => import(/* webpackChunkName: "add" */ '../../views/Add.vue'),
    beforeEnter: (to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) { 
        var token = localStorage.getItem('access_token')
        if (!token || token == null || token == undefined ) {
            next({
            path: '/login',
            })
        } else if(localStorage.getItem('role') == 'Outsource') {
            next({path: '/tasks'})
        } else {
            next()
        }
        }
    },
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
        path: 'engagement/taxform',
        component: () => import('@/children/TaxForm.vue'),
            meta: {
            requiresAuth: true,
            breadCrumb: [
                { name: 'New Tax Engagement' }
            ]
        },
        },
        {
        // this is the children route for adding a new engagement
        path: 'engagement/bookkeepingform',
        component: () => import('@/children/BookForm.vue'),
            meta: {
            requiresAuth: true,
            breadCrumb: [
                { name: 'New Bookkeeping Engagement' }
            ]
        },
        },
        {
        // this is the children route for adding a new engagement
        path: 'engagement/customform',
        component: () => import('@/children/CustomForm.vue'),
            meta: {
            requiresAuth: true,
            breadCrumb: [
                { name: 'New Custom Engagement' }
            ]
        },
        }
    ]
    },
]
