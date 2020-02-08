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
            name: 'details',
            component: () => import('@/children/engagement/EngageDetails.vue'),
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
            name: 'enotes',
            component: () => import('@/children/engagement/EngageNotes.vue'),
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
            name: 'questions',
            component: () => import('@/children/engagement/EngageQuestions.vue'),
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
            name: 'invoice',
            component: () => import('@/children/engagement/EngageInvoice.vue'),
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
            component: () => import('@/children/engagement/EditEngage.vue'),
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
            name: 'history',
            component: () => import('@/children/engagement/EngageHistory.vue'),
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
            component: () => import('@/children/question/AddQuestion.vue'),
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
            component: () => import('@/children/question/EditQuest.vue'),
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
            component: () => import('@/children/question/AnswerQuest.vue'),
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
            component: () => import('@/children/question/EditAnswer.vue'),
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
