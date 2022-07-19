import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'blog-post-collection',
        component: () => import('@/layouts/BlogPostsLayout.vue'),
      },
      {
        path: '/blogpost',
        name: 'blogpost',
        component: () => import('@/layouts/BlogPostLayout.vue'),
      },
      {
        path: '/random',
        name: 'random',
        component: () => import('@/layouts/Random.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
