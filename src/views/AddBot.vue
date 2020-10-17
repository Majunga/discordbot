<template>
  <div>
    <h1>Add bot</h1>
    <br />

    <b-container>
      <form class="addbot" @submit.prevent="addbot">
        <Editor-Row type="number" label="Client Id" v-model.number="clientId" required />
        <Editor-Row type="text" label="Name" v-model="name" required />
        <Editor-Row type="text" label="Token" v-model="token" required />
        <hr />
        <b-button-group class="float-right">
          <b-button type="button" variant="success" @click="save()"
            >Save</b-button
          >
          <b-button type="button" @click="cancel()">Cancel</b-button>
        </b-button-group>
      </form>
    </b-container>
  </div>
</template>

<script>
import EditorRow from '../components/controls/EditorRow'
import * as botRepo from '../services/discordApi/botRepo'

export default {
  name: 'AddBot',
  components: {
    EditorRow
  },
  data () {
    return {
      clientId: undefined,
      name: undefined,
      token: undefined
    }
  },
  methods: {
    save () {
      const newBot = {
        clientId: this.clientId,
        name: this.name,
        token: this.token
      }

      botRepo.set(newBot).then(() => {
        const route = { name: 'ViewBot', params: newBot }
        console.log('pushing to', route)
        this.$router.push(route)
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
