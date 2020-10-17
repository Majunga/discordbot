<template>
  <div>
    <h1 v-b-toggle.collapse-1 variant="primary">View bot</h1>
    <br />
      <b-container>
          <Editor-Row type="text" label="Client Id"   v-model="clientId"  required readonly />
          <Editor-Row type="text" label="Name"        v-model="name"      required />
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
    <b-container>
      <ServerList :clientId="clientId" v-bind:token="token" />
    </b-container>
  </div>
</template>

<script>
import EditorRow from '../components/controls/EditorRow'
import ServerList from '../components/ServerList'
import { isDefined } from '../lib/Check'
import * as botRepo from '../services/discordApi/botRepo'
import * as guildRepo from '../services/discordApi/guildRepo.js'

export default {
  name: 'ViewBot',
  components: {
    EditorRow,
    ServerList
  },
  computed: {
  },
  props: {
    clientId: Number
  },
  data () {
    return {
      name: null,
      token: null
    }
  },
  mounted () {
    botRepo.get(this.clientId).then((res) => {
      console.log('Got bot:', res)
      this.name = res.data.name
      this.token = res.data.token
    })
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
      botRepo.remove(this.clientId).then(() => {
        guildRepo.search({ clientId: this.clientId }).then((res) => {
          if (isDefined(res.body)) {
            for (const guild of res.body) {
              guildRepo.remove(guild.guildId)
            }
          }

          this.$router.go(-1)
        })
      })
    },
    save () {
      const newBot = {
        clientId: this.clientId,
        name: this.name,
        token: this.token
      }

      botRepo.set(newBot)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
