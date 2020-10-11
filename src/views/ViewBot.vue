<template>
  <div>
    <h1 v-b-toggle.collapse-1 variant="primary">View bot</h1>
    <br />
    <b-collapse id="collapse-1" class="mt-2">
      <b-container>
          <Editor-Row type="text" label="Client Id"   v-model="clientId"  required readonly />
          <Editor-Row type="text" label="Name"        v-model="name"      required />
          <Editor-Row type="text" label="Token"       v-model="token"     required />

          <b-button-group class="float-left">
              <b-button type="button" variant="danger" @click="showDeleteConfirmation">Delete</b-button>
          </b-button-group>
          <b-button-group class="float-right">
              <b-button type="button" variant="success" @click="save()">Save</b-button>
              <b-button type="button" @click="back()">back</b-button>
          </b-button-group>
          <br />
          <hr />
      </b-container>
    </b-collapse>
    <b-container>
      <Soundboard :clientId="clientId" />
    </b-container>
  </div>
</template>

<script>
import EditorRow from '../components/controls/EditorRow'
import Soundboard from '../components/Soundboard'

export default {
  name: 'ViewBot',
  components: {
    EditorRow,
    Soundboard
  },
  computed: {
  },
  props: {
    clientId: String,
    name: String,
    token: String
  },
  methods: {
    showDeleteConfirmation () {
      this.$bvModal.msgBoxConfirm('Are you sure?')
        .then(value => {
          this.deleteBot()
        })
        .catch(err => {
          console.error(err)
        })
    },
    deleteBot () {
      const oldBots = JSON.parse(localStorage.getItem('bots')) ?? []
      const newBots = oldBots.filter((record) => record.clientId !== this.clientId)
      localStorage.setItem('bots', JSON.stringify(newBots))
      this.$router.go(-1)
    },
    save () {
      const oldBots = JSON.parse(localStorage.getItem('bots')) ?? []

      const updatedBots = oldBots.filter((record) => record.clientId !== this.clientId)

      updatedBots.push({
        clientId: this.clientId,
        name: this.name,
        token: this.token
      })

      console.log(updatedBots)

      localStorage.setItem('bots', JSON.stringify(updatedBots))
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
