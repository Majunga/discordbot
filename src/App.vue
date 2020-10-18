<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="loggedIn" to="/logout">Log out</router-link>
      <router-link v-if="!loggedIn" to="/login">Log in</router-link>

    </div>
    <Alerts :bus="bus"/>
    <router-view :bus="bus"/>
  </div>
</template>
<script>
import Alerts from '@/components/controls/Alerts'
import Vue from 'vue'
import auth from '@/services/authentication/auth'

export default {
  name: 'App',
  components: {
    Alerts
  },
  data () {
    return {
      bus: new Vue(),
      loggedIn: auth.loggedIn()
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
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
