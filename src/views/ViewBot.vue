<template>
  <div>
    <h1 v-b-toggle.collapse-1 variant="primary">View bot</h1>
    <br />
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
    <b-container>
      <ServerList :clientId="clientId" />
    </b-container>
  </div>
</template>

<script>
import EditorRow from '../components/controls/EditorRow'
import ServerList from '../components/ServerList'
import { isDefined } from '../lib/Check'
import { BotRepo } from '../repos/BotRepo'
import { GuildRepo } from '../repos/GuildRepo'

const botRepo = new BotRepo()
const guildBot = new GuildRepo()

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
    const bot = botRepo.get(this.clientId)

    return {
      name: bot.name,
      token: bot.token
    }
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
      botRepo.remove(this.clientId)
      const guild = guildBot.get()?.find(guild => guild.clientId === this.clientId)

      if (isDefined(guild)) {
        guildBot.remove(guild.clientId)
      }

      this.$router.go(-1)
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
