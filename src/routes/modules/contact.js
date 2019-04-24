export default [
{
    // this is the client account page with tabbable children routes
    path: '/contact/:id',
    name: 'contact-details',
    component: () => import('../../views/ContactDetails.vue'),
    meta: {
        requiresAuth: true,
        layout: "default",
        breadCrumb: [
        { name: 'Contact Details' }
        ]
    },
    children: [          
        {
        // this is the path to view the account of the client
        path: 'account',
        name: 'account',
        component: () => import('@/contact/Account.vue'),
            meta: {
            requiresAuth: true,
            breadCrumb: [
                { name: 'Account' }
            ]
            },
            children: [
            {
            // this is the path to edit contact
            path: 'edit',
            component: () => import('@/children/EditContact.vue'),
                meta: {
                requiresAuth: true,
                breadCrumb: [
                    { name: 'Edit Contact' }
                ]
                },
            },
            {
            // this is the path to add dependent
            path: 'add-dependent',
            component: () => import('@/children/AddDependent.vue'),
                meta: {
                requiresAuth: true,
                breadCrumb: [
                    { name: 'Add Dependent' }
                ]
                },
            },
            {
            // this is the path to edit dependent
            path: 'edit-dependent/:dependent',
            component: () => import('@/children/EditDepend.vue'),
                meta: {
                requiresAuth: true,
                breadCrumb: [
                    { name: 'Edit Dependent' }
                ]
                },
            },
            {
            // this is the path to add dependent
            path: 'add-business',
            component: () => import('@/children/AddBusiness.vue'),
                meta: {
                requiresAuth: true,
                breadCrumb: [
                    { name: 'Add Business' }
                ]
                },
            },
            {
            // this is the path to add dependent
            path: 'edit-business/:business',
            component: () => import('@/children/EditBusiness.vue'),
                meta: {
                requiresAuth: true,
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
        name: 'contact-engagements',
        component: () => import('@/contact/ContactEngagements.vue'),
            meta: {
            requiresAuth: true,
            breadCrumb: [
                { name: 'Engagements' }
            ]
            },
            children: [
            {
                // this is the path to add an engagement to singel client
                path: 'add-engagement',
                component: () => import('@/children/AddEngagement.vue'),
                meta: {
                    requiresAuth: true,
                    breadCrumb: [
                    { name: 'Add Engagement' }
                    ]
                },
                },
            ],
        },
        {
        // this is the path to view the files belonging to client
        path: 'files',
        component: () => import('@/contact/Files.vue'),
            meta: {
            requiresAuth: true,
            breadCrumb: [
                { name: 'Files' }
            ]
            },
        },
        {
        // this is the path to view the notes belonging to client
            path: 'notes',
            name: 'notes',
            component: () => import('@/contact/Notes.vue'),
            meta: {
            requiresAuth: true,
            breadCrumb: [
                { name: 'Notes' }
                ],
            },
            children: [
                {
                path: 'add-note',
                component: () => import('@/children/AddNote.vue'),
                    meta: {
                    requiresAuth: true,
                    breadCrumb: [
                        { name: 'Add Note' }
                    ]
                },
                },
                {
                path: 'edit-note/:note',
                component: () => import('@/children/EditNote.vue'),
                    meta: {
                    requiresAuth: true,
                    breadCrumb: [
                        { name: 'Edit Note' }
                    ]
                },
                },
            ],
        },
        {
        // this is the path to view the pending belonging to the client
        path: 'pending',
        component: () => import('@/contact/Pending.vue'),
            meta: {
            requiresAuth: true,
            breadCrumb: [
                { name: 'Pending' }
            ]
            },
        },
        {
            // this is the path to view the portal belonging to the client
            path: 'portal',
            component: () => import('@/contact/Portal.vue'),
            meta: {
            requiresAuth: true,
            breadCrumb: [
                { name: 'Portal' }
            ]
            },
        }
    ],
    },
]
