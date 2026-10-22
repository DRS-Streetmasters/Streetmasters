import { createRouter, createWebHistory } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { routerBase } from '../lib/launch'

const router = createRouter({
  history: createWebHistory(routerBase),
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
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/diensten',
      name: 'diensten',
      component: () => import('../views/ServicesView.vue'),
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue'),
    },
    {
      path: '/offerte',
      name: 'offerte',
      component: () => import('../views/OfferView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

// Apply before mounting the page so catalog filters cannot discard the code.
router.beforeResolve(async to => {
  const code = to.query.discount
  if (typeof code !== 'string' || !code.trim()) return
  if (await useCartStore().setDiscount(code)) {
    const { discount, ...query } = to.query
    return { path: to.path, query, hash: to.hash, replace: true }
  }
})

export default router
