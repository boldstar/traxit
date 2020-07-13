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
            // this is the path to view the account of the client
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
                    // this is the path to edit contact
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
            // this is the path to view the engagements that belong to the client
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
                    // this is the path to add an engagement to singel client
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
        ],
        },
    ]
    