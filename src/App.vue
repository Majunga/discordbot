<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
        <a
          class="item"
          v-if="!authenticated"
          v-on:click="login()"
        >
        Login
        </a>
        <router-link
          to="/"
          id="logout-button"
          class="item"
          v-if="authenticated"
          v-on:click.native="logout()"
        >
        Logout
        </router-link>
    </div>
    <Alerts :bus="bus"/>
    <router-view :bus="bus"/>
  </div>
</template>
<script>
import Alerts from '@/components/controls/Alerts'
import Vue from 'vue'

export default {
  name: 'App',
  components: {
    Alerts
  },
  data () {
    return {
      bus: new Vue(),
      authenticated: false
    }
  },
  created () { this.isAuthenticated() },
  watch: {
    // Everytime the route changes, check for auth status
    $route: 'isAuthenticated'
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
    },
    login () {
      this.$auth.loginRedirect('/')
    },
    async logout () {
      await this.$auth.logout()
      await this.isAuthenticated()
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
