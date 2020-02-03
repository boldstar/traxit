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
            path: 'account',
            name: 'account',
            component: () => import('@/children/business/Account.vue'),
                meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                    { name: 'Business Account' }
                ]
                },
                children: [
                    {
                    // this is the path to edit contact
                    path: 'edit',
                    component: () => import('@/children/business/EditBusiness.vue'),
                        meta: {
                        requiresAuth: true,
                        layout: "default",
                        breadCrumb: [
                            { name: 'Edit Contact' }
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
                    { name: 'Engagements' }
                ]
                },
                children: [
                {
                    // this is the path to add an engagement to singel client
                    path: 'add-business-engagement',
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
    