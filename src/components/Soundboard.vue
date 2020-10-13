<template>
  <div>
    <b-button variant="success" @click="addSoundclip()">Add Soundclip</b-button>

    <div v-for="soundclip in soundclips" v-bind:key="soundclip.clientId">
      <b-card
        @click="play(soundclip)"
        :img-src="soundclip.imageUrl"
        style="max-width: 10rem"
      >
        {{ soundclip.name }}
      </b-card>
    </div>
  </div>
</template>
<script>
import { SoundclipRepo } from '../repos/SoundclipRepo'
import { BotRepo } from '../repos/BotRepo'
import { GuildRepo } from '../repos/GuildRepo'
import { playmusic } from '../lib/DiscordApi'

const soundclipRepo = new SoundclipRepo()
const botRepo = new BotRepo()
const guildRepo = new GuildRepo()

export default {
  name: 'Soundboard',
  props: {
    clientId: String,
    guildId: String
  },
  data () {
    const soundclips = soundclipRepo.get().filter(s => s.guildId === this.guildId)
    return {
      fields: ['name'],
      soundclips: soundclips
    }
  },
  methods: {
    play (soundclip) {
      const guild = guildRepo.get(soundclip.guildId)

      const data = {
        guildId: soundclip.guildId,
        channelId: guild.channelId,
        userId: guild.userId,
        url: `${soundclip.url}`
      }

      console.log(data)
      playmusic(botRepo.get(this.clientId).token, data).then(response => {
        console.log('join', response)
      })
    },
    addSoundclip () {
      const route = { name: 'AddSoundClip', params: { clientId: this.clientId, guildId: this.guildId } }
      console.log('Push to', route)
      this.$router.push(route)
    }
  }
}
</script>
