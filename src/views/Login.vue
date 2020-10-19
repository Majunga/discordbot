<template>
  <b-container>
    <h2>Login</h2>
    <hr/>
    <form>
      <EditorRow type="text"     label="Username" v-model="username" placeholder="Username" />
      <EditorRow type="password" label="password" v-model="password" placeholder="Password" />
      <br/>
      <b-button variant="success" @click="login">Login</b-button>
    </form>
  </b-container>
</template>
<script>
import EditorRow from '@/components/controls/EditorRow'
import auth from '@/services/authentication/auth'

export default {
  name: 'Login',
  components: {
    EditorRow
  },
  props: {
    bus: Object
  },
  data () {
    return {
      username: undefined,
      password: undefined
    }
  },
  methods: {
    async login () {
      const loggedIn = await auth.login(this.username, this.password)
      console.debug('Logged in: ', loggedIn)

      if (loggedIn) {
        this.$router.replace(this.$route.query.redirect || '/')
      } else {
        this.bus.$emit('alert', 'Login Failed', 'danger')
      }
    }
  }
}
</script>
