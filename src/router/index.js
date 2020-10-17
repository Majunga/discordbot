import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddBot from '../views/AddBot.vue'
import ViewBot from '../views/ViewBot.vue'
import ViewServer from '../views/ViewServer.vue'
import AddSoundClip from '../views/AddSoundClip.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addbot',
    name: 'AddBot',
    component: AddBot
  },
  {
    path: '/viewbot/:clientId',
    name: 'ViewBot',
    component: ViewBot,
    props: true
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

export default router
