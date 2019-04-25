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
            path: 'edit',
            component: () => import('@/children/EditEngage.vue'),
              meta: {
                requiresAuth: true,
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
                breadCrumb: [
                  { name: 'Edit Answer' }
              ]
            },
          },
        ]
      },
]
