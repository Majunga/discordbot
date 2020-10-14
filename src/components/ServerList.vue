<template>
  <b-container>
    <b-table striped hover :items="guilds" :fields="fields" @row-clicked="rowClicked" />
  </b-container>
</template>

<script>
import { BotRepo } from '../repos/BotRepo'
import { GuildRepo } from '../repos/GuildRepo'
import { isDefined } from '../lib/Check'
import { guilds } from '../lib/DiscordApi'

const botRepo = new BotRepo()
const guildRepo = new GuildRepo()

export default {
  name: 'ServerList',
  props: {
    clientId: String
  },
  data () {
    return {
      fields: ['guildId', 'name'],
      guilds: []
    }
  },
  methods: {
    rowClicked (record) {
      const guild = guildRepo.get(record.guildId)

      if (isDefined(guild) === false) {
        guildRepo.set({
          clientId: record.clientId,
          guildId: record.guildId,
          name: record.name
        })
      }

      const route = { name: 'ViewServer', params: { clientId: this.clientId, guildId: record.guildId } }
      console.log('pushing to', route)
      this.$router.push(route)
    }
  },
  mounted () {
    guilds(botRepo.get(this.clientId).token)
      .then(response => {
        this.guilds = response.data
        console.log(response)
      })
  }
}
</script>
