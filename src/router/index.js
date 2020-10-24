import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import AddBot from '@/views/discord/AddBot.vue'
import ViewBot from '@/views/discord/ViewBot.vue'
import ViewServer from '@/views/discord/ViewServer.vue'
import AddSoundClip from '@/views/discord/AddSoundClip.vue'
import Auth from '@okta/okta-vue'

const { VUE_APP_REDIRECTURL, VUE_APP_CLIENT_ID, VUE_APP_ISSUER, VUE_APP_OKTA_TESTING_DISABLEHTTPSCHECK } = process.env
console.log(process.env)
Vue.use(VueRouter)
Vue.use(Auth, {
  clientId: VUE_APP_CLIENT_ID,
  issuer: VUE_APP_ISSUER,
  redirectUri: VUE_APP_REDIRECTURL,
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  testing: {
    disableHttpsCheck: VUE_APP_OKTA_TESTING_DISABLEHTTPSCHECK
  }
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login/callback',
    component: Auth.handleCallback()
  },
  {
    path: '/addbot',
    name: 'AddBot',
    component: AddBot,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/viewbot/:clientId',
    name: 'ViewBot',
    component: ViewBot,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/viewserver/:clientId/:guildId',
    name: 'ViewServer',
    component: ViewServer,
    props: true
  },
  {
    path: '/addsoundclip/:clientId/:guildId/:soundclipId',
    name: 'AddSoundClip',
    component: AddSoundClip,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())
export default router
