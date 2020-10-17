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
import * as guildRepo from '@/services/discordApi/guildRepo'
import { isDefined, isNullOrWhitespace } from '@/lib/Check'
import { guilds } from '@/lib/DiscordApi'

export default {
  name: 'ServerList',
  props: {
    clientId: String,
    token: String
  },
  data () {
    return {
      fields: ['guildId', 'name'],
      servers: undefined
    }
  },
  async mounted () {
    const vm = this
    if (isDefined(this.token)) {
      const response = await guilds(this.token)
      console.log('Guilds:', response.data)
      vm.servers = response.data
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
    async rowClicked (record, index) {
      const guildRes = await guildRepo.get(record.guildId)
      const guild = guildRes.body
      if (isDefined(guild) === false || (isDefined(guild) && isNullOrWhitespace(guild.name))) {
        await guildRepo.set({
          clientId: record.clientId,
          guildId: record.guildId,
          name: record.name
        })
      }

      this.gotoViewServer(record.guildId)
    }
  }
}
</script>
