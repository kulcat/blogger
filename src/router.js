import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'
import { AppState } from './AppState.js';

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/profile/',
    name: 'Profile',
    component: loadPage('ProfilePage'),
  },
  {
    path: '/blog/',
    name: 'FullBlog',
    component: loadPage('FullBlogPage'),
    beforeEnter: (to, from, next) => {
    if (!AppState.activeBlog) {
      next({ name: "Home" });
    } else {
      next();
    }
  }
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
