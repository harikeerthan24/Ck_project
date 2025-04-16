/**
 * @file router/index.ts
 * @description Defines the application routing configuration for Vue Router
 */

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('@/views/WelcomeView.vue')
    },
    {
      path: '/student-survey',
      name: 'NewSurvey',
      component: () => import('@/views/StudentSurveyView.vue')
    },
    {
      path: '/survey-list',
      name: 'SurveyList',
      component: () => import('@/views/SurveyListView.vue')
    },
    {
      path: '/edit-survey/:id',
      name: 'EditSurvey',
      component: () => import('@/views/StudentSurveyView.vue'),
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/welcome'
    }
  ]
});

export default router; 