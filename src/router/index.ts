import IndexScreenVue from '@/pages/IndexScreen.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from '../views/LoginScreen.vue';
import MovieDetails from '../views/MovieDetails.vue';

const isAuthenticated = () => localStorage.getItem('authenticated') === 'true'

const routes = [
  {
    path: '/',
    redirect : '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginScreen,
  },
  {
    path: '/home',
    name: 'Home',
    component: IndexScreenVue,
    meta : {
      requiresAuth : true
    }
  },
  { path: '/movie/:imdbID', name: 'MovieDetails', component: MovieDetails, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})

export default router;
