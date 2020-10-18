import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import AddBot from '@/views/discord/AddBot.vue'
import ViewBot from '@/views/discord/ViewBot.vue'
import ViewServer from '@/views/discord/ViewServer.vue'
import AddSoundClip from '@/views/discord/AddSoundClip.vue'

import auth from '@/services/authentication/auth'

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    beforeEnter (to, from, next) {
      auth.logout()
      next('/')
    }
  },
  {
    path: '/addbot',
    name: 'AddBot',
    component: AddBot,
    beforeEnter: requireAuth
  },
  {
    path: '/viewbot/:clientId',
    name: 'ViewBot',
    component: ViewBot,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/viewserver/:clientId/:guildId',
    name: 'ViewServer',
    component: ViewServer,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/addsoundclip/:clientId/:guildId/:soundclipId',
    name: 'AddSoundClip',
    component: AddSoundClip,
    props: true,
    beforeEnter: requireAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
