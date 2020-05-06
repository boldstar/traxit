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
        component: () => import('@/children/contact/Account.vue'),
            meta: {
            requiresAuth: true,
            layout: "default",
            breadCrumb: [
                { name: 'Account' }
            ]
            },
            children: [
            {
            // this is the path to edit contact
            path: 'edit',
            component: () => import('@/children/contact/EditContact.vue'),
                meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                    { name: 'Edit Contact' }
                ]
                },
            },
            {
            // this is the path to edit dependent
            path: 'dependent/:dependent',
            component: () => import('@/children/contact/DependentCrud.vue'),
                meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                    { name: 'Dependent Form' }
                ]
                },
            },
            {
            // this is the path to add dependent
            path: 'business/:business',
            component: () => import('@/children/contact/BusinessCrud.vue'),
                meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                    { name: 'Business Form' }
                ]
                },
            },
            ]
        },
        {
        // this is the path to view the engagements that belong to the client
        path: 'engagements',
        name: 'contact-engagements',
        component: () => import('@/children/contact/ContactEngagements.vue'),
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
                path: 'add-engagement',
                component: () => import('@/children/engagement/AddEngagement.vue'),
                meta: {
                    requiresAuth: true,
                    layout: "default",
                    breadCrumb: [
                    { name: 'Add Engagement' }
                    ]
                },
                },
            ],
        },
        {
        // this is the path to view the notes belonging to client
            path: 'notes',
            name: 'notes',
            component: () => import('@/children/contact/Notes.vue'),
            meta: {
            requiresAuth: true,
            layout: "default",
            breadCrumb: [
                { name: 'Notes' }
                ],
            },
            children: [
                {
                path: 'add-note',
                component: () => import('@/children/note/AddNote.vue'),
                    meta: {
                    requiresAuth: true,
                    layout: "default",
                    breadCrumb: [
                        { name: 'Add Note' }
                    ]
                },
                },
                {
                path: 'edit-note/:note',
                component: () => import('@/children/note/EditNote.vue'),
                    meta: {
                    requiresAuth: true,
                    layout: "default",
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
        name: 'pending',
        component: () => import('@/children/contact/Pending.vue'),
            meta: {
            requiresAuth: true,
            layout: "default",
            breadCrumb: [
                { name: 'Pending' }
            ]
            },
        },
        {
            // this is the path to view the portal belonging to the client
            path: 'portal',
            name: 'portal',
            component: () => import('@/children/contact/Portal.vue'),
            meta: {
            requiresAuth: true,
            layout: "default",
            breadCrumb: [
                { name: 'Portal' }
            ]
            },
        },
        {
            // this is the path to view the portal belonging to the client
            path: 'contact-businesses',
            name: 'contact-businesses',
            component: () => import('@/children/contact/ContactBusinesses.vue'),
            meta: {
            requiresAuth: true,
            layout: "default",
            breadCrumb: [
                { name: 'Contact Businesses' }
            ]
            },
        },
        {
            // this is the path to view the portal belonging to the client
            path: 'contact-dependents',
            name: 'contact-dependents',
            component: () => import('@/children/contact/ContactDependents.vue'),
            meta: {
            requiresAuth: true,
            layout: "default",
            breadCrumb: [
                { name: 'Contact Dependents' }
            ]
            },
        },
        {
            // this is the path to view the portal belonging to the client
            path: 'contact-settings',
            name: 'contact-settings',
            component: () => import('@/children/contact/ContactSettings.vue'),
            meta: {
            requiresAuth: true,
            layout: "default",
            breadCrumb: [
                { name: 'Contact Settings' }
            ]
            },
        },
    ],
    },
]
