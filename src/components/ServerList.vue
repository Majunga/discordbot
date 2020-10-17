<template>
  <b-container>
    <b-table
      striped
      hover
      v-bind:items="servers"
      :fields="fields"
      @row-clicked="rowClicked"
    />
  </b-container>
</template>

<script>
import * as guildRepo from '../services/discordApi/guildRepo'
import { isDefined, isNullOrWhitespace } from '../lib/Check'
import { guilds } from '../lib/DiscordApi'

export default {
  name: 'ServerList',
  props: {
    clientId: Number,
    token: String
  },
  data () {
    return {
      fields: ['guildId', 'name'],
      servers: undefined
    }
  },
  mounted () {
    const vm = this
    if (isDefined(this.token)) {
      guilds(this.token).then((response) => {
        console.log('Guilds:', response.data)
        vm.servers = response.data
      })
    }
  },
  methods: {
    gotoViewServer (guildId) {
      const route = {
        name: 'ViewServer',
        params: { clientId: this.clientId, guildId: guildId }
      }
      console.log('pushing to', route)
      this.$router.push(route)
    },
    rowClicked (record) {
      guildRepo.get(record.guildId).then((res) => {
        const guild = res.body
        if (isDefined(guild) === false || (isDefined(guild) && isNullOrWhitespace(guild.name))) {
          guildRepo.set({
            clientId: record.clientId,
            guildId: record.guildId,
            name: record.name
          }).then(() => {
            this.gotoViewServer(record.guildId)
          })
        } else {
          this.gotoViewServer(record.guildId)
        }
      })
    }
  }
}
</script>
