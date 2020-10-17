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
      <ServerList :clientId="clientId" v-if="token" :token="token" />
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
    clientId: String
  },
  data () {
    return {
      name: null,
      token: null
    }
  },
  async mounted () {
    const res = await botRepo.get(this.clientId)
    console.log('Got bot:', res)
    this.name = res.data.name
    this.token = res.data.token
  },
  methods: {
    async showDeleteConfirmation () {
      await this.$bvModal.msgBoxConfirm('Are you sure?')
      this.deleteBot()
    },
    async deleteBot () {
      await botRepo.remove(this.clientId)
      const res = await guildRepo.search({ clientId: this.clientId })
      if (isDefined(res.body)) {
        for (const guild of res.body) {
          await guildRepo.remove(guild.guildId)
        }
      }

      this.$router.go(-1)
    },
    async save () {
      const newBot = {
        clientId: this.clientId,
        name: this.name,
        token: this.token
      }

      await botRepo.set(newBot)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
