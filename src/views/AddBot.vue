<template>
  <div>
    <h1>Add bot</h1>
    <br />

    <b-container>
      <form class="addbot" @submit.prevent="addbot">
        <Editor-Row type="text" label="Client Id"  v-model="clientId" required />
        <Editor-Row type="text" label="Name"  v-model="name" required />
        <Editor-Row type="text" label="Token" v-model="token" required />
        <hr />
        <b-button-group class="float-right">
          <b-button type="button" variant="success" @click="save()">Save</b-button>
          <b-button type="button" @click="cancel()">Cancel</b-button>
        </b-button-group>
      </form>
    </b-container>
  </div>
</template>

<script>
import EditorRow from '../components/controls/EditorRow'

export default {
  name: 'AddBot',
  components: {
    EditorRow
  },
  props: {
    clientId: String,
    name: String,
    token: String
  },
  methods: {
    save () {
      const bots = JSON.parse(localStorage.getItem('bots')) ?? []

      bots.push({
        clientId: this.clientId,
        name: this.name,
        token: this.token
      })

      console.log(bots)

      localStorage.setItem('bots', JSON.stringify(bots))

      const route = { name: 'ViewBot', params: { clientId: this.clientId, name: this.name, token: this.token } }
      console.log('pushing to', route)
      this.$router.push(route)
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
