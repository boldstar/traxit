export default [
    {
        // this is the client account page with tabbable children routes
        path: '/business/:id',
        name: 'business-details',
        component: () => import('../../views/BusinessDetails.vue'),
        meta: {
            requiresAuth: true,
            layout: "default",
            breadCrumb: [
            { name: 'Business Details' }
            ]
        },
        children: [          
            {
            path: 'details',
            name: 'account-details',
            component: () => import('@/children/business/BusinessAccount.vue'),
                meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                    { name: 'Business Details' }
                ]
                },
                children: [
                    {
                    path: 'edit',
                    name: 'edit-business',
                    component: () => import('@/children/business/BusinessDetailsCrud.vue'),
                    meta: {
                            requiresAuth: true,
                            layout: "default",
                            breadCrumb: [
                                { name: 'Edit Business' }
                            ]
                        },
                    },
                ]
            },
            {
            path: 'engagements',
            name: 'business-engagements',
            component: () => import('@/children/business/BusinessEngagements.vue'),
                meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                    { name: 'Business Engagements' }
                ]
                },
                children: [
                {
                    path: 'add',
                    name: 'add-business-engagement',
                    component: () => import('@/children/business/AddBusinessEngagement.vue'),
                    meta: {
                        requiresAuth: true,
                        layout: "default",
                        breadCrumb: [
                        { name: 'Add Business Engagement' }
                        ]
                    },
                    },
                ],
            },
            {
            path: 'services',
            name: 'business-services',
            component: () => import('@/children/business/BusinessServices.vue'),
                meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                    { name: 'Business Services Provided' }
                ]
                },
            },
            {
            path: 'notes',
            name: 'business-notes',
            component: () => import('@/children/business/BusinessNotes.vue'),
                meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                    { name: 'Business Notes' }
                ]
                },
            },
            {
            path: 'owner',
            name: 'business-owner',
            component: () => import('@/children/business/BusinessOwner.vue'),
                meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                    { name: 'Business Owner' }
                ]
                },
            },
            {
            path: 'bookkeeping',
            name: 'business-bookkeeping',
            component: () => import('@/children/business/BusinessBookkeeping.vue'),
                meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                    { name: 'Business Bookkeeping' }
                ]
                },
            },
        ],
        },
    ]
    