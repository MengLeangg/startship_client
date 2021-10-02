import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5815363a = () => interopDefault(import('../pages/chat.vue' /* webpackChunkName: "pages/chat" */))
const _325f55a4 = () => interopDefault(import('../pages/messages.vue' /* webpackChunkName: "pages/messages" */))
const _167af304 = () => interopDefault(import('../pages/signin.vue' /* webpackChunkName: "pages/signin" */))
const _2b11497a = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _1c7f4f60 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/chat",
    component: _5815363a,
    name: "chat"
  }, {
    path: "/messages",
    component: _325f55a4,
    name: "messages"
  }, {
    path: "/signin",
    component: _167af304,
    name: "signin"
  }, {
    path: "/signup",
    component: _2b11497a,
    name: "signup"
  }, {
    path: "/",
    component: _1c7f4f60,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
