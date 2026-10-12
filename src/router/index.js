import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import OfferView from '../views/OfferView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import ServicesView from '../views/ServicesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    // Category links must reach their anchor even when coming from another page.
    if (to.hash) {
      const target = document.querySelector(to.hash)
      return { el: to.hash, top: target ? parseFloat(getComputedStyle(target).scrollMarginTop) || 0 : 0 }
    }

    if (to.path !== from.path) {
      return { left: 0, top: 0 }
    }

    // Filtering should keep the catalog in view instead of jumping to the hero.
    if (to.path === from.path && !to.hash && !from.hash) return false

    return { left: 0, top: 0 }
  },
  routes: [
    { path: '/shop', name: 'shop', component: () => import('../views/ShopView.vue') },
    { path: '/shop/:handle', name: 'product', component: () => import('../views/ProductView.vue') },
    { path: '/winkelmand', name: 'cart', component: () => import('../views/CartView.vue') },
    { path: '/account', name: 'account', component: () => import('../views/AccountView.vue') },
    { path: '/account/callback', name: 'account-callback', component: () => import('../views/AccountCallbackView.vue') },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/diensten',
      name: 'diensten',
      component: ServicesView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView,
    },
    {
      path: '/offerte',
      name: 'offerte',
      component: OfferView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
