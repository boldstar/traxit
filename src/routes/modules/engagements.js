export default [
    {
        //this is the route to view single engagement
        path: '/engagement/:id',
        name: 'engagement-details',
        component: () => import(/* webpackChunkName: "engagement-details" */ '../../views/EngagementDetails.vue'),
        meta: {
            requiresAuth: true,
            layout: "default",
            breadCrumb: [
              { name: 'Engagement Details' }
            ]
          },
        children: [
          {
            path: 'details',
            component: () => import('@/children/EngageDetails.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Engagement Details' }
              ]
            },
          },
          {
            path: 'notes',
            component: () => import('@/children/EngageNotes.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Engagement Notes' }
              ]
            },
          },
          {
            path: 'questions',
            component: () => import('@/children/EngageQuestions.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Engagement Questions' }
              ]
            },
          },
          {
            path: 'invoice',
            component: () => import('@/children/EngageInvoice.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Engagement Invoice' }
              ]
            },
          },
          {
            path: 'edit',
            component: () => import('@/children/EditEngage.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Edit Engagement' }
              ]
            },
          },
          {
            path: 'history',
            component: () => import('@/children/EngageHistory.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Engagement History' }
              ]
            },
          },
          {
            path: 'add-question',
            component: () => import('@/children/AddQuestion.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Add Question' }
              ]
            },
          },
          {
            path: 'edit-question/:question',
            component: () => import('@/children/EditQuest.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Edit Question' }
              ]
            },
          },
          {
            path: 'answer-question/:question',
            component: () => import('@/children/AnswerQuest.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Answer Question' }
              ]
            },
          },
          {
            path: 'edit-answer-question/:question',
            component: () => import('@/children/EditAnswer.vue'),
              meta: {
                requiresAuth: true,
                layout: "default",
                breadCrumb: [
                  { name: 'Edit Answer' }
              ]
            },
          },
        ]
      },
]
