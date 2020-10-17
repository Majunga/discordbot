<template>
  <div>
    <b-button variant="success" @click="addSoundclip()">Add Soundclip</b-button>
    <b-card-group
      deck
    >
      <b-card
        v-for="soundclip in soundclips"
        v-bind:key="soundclip.clientId"
        @click="play(soundclip)"
        :img-src="soundclip.imageUrl"
        style="max-width: 10rem"
      >
        {{ soundclip.name }}
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
import * as soundclipRepo from '../services/discordApi/soundclipRepo'
import * as botRepo from '../services/discordApi/botRepo'
import * as guildRepo from '../services/discordApi/guildRepo'
import { playmusic } from '../lib/DiscordApi'

export default {
  name: 'Soundboard',
  props: {
    clientId: String,
    guildId: String
  },
  data () {
    return {
      fields: ['name'],
      soundclips: []
    }
  },
  async mounted () {
    const res = await soundclipRepo.search({ guildId: this.guildId })
    this.soundclips = res.data
  },
  methods: {
    async play (soundclip) {
      const res = await guildRepo.get(soundclip.guildId)
      const guild = res.data

      const data = {
        guildId: guild.guildId,
        userId: guild.userId,
        url: `${soundclip.url}`
      }

      const botRes = await botRepo.get(this.clientId)
      console.log(data)

      const playRes = await playmusic(botRes.data.token, data)
      console.log('join', playRes)
    },
    addSoundclip () {
      const route = {
        name: 'AddSoundClip',
        params: { clientId: this.clientId, guildId: this.guildId }
      }
      console.log('Push to', route)
      this.$router.push(route)
    }
  }
}
</script>
