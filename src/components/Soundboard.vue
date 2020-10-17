<template>
  <div>
    <b-button variant="success" @click="addEditSoundclip()">Add Soundclip</b-button>
    <b-card-group
      deck
    >
      <b-card
        no-body
        v-for="soundclip in soundclips"
        v-bind:key="soundclip.clientId"
        :img-src="soundclip.imageUrl"
        style="max-width: 10rem"
      >
      <b-card-body @click="play(soundclip)">{{ soundclip.name }}</b-card-body>
        <b-card-footer>
          <b-button-group>
            <b-button variant="success" @click="addEditSoundclip(soundclip.soundclipId)">Edit</b-button>
            <b-button variant="danger" @click="removeSoundclip(soundclip.soundclipId)">Delete</b-button>
          </b-button-group>
        </b-card-footer>
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
    await this.getSoundclips()
  },
  methods: {
    async getSoundclips () {
      const res = await soundclipRepo.search({ guildId: this.guildId })
      this.soundclips = res.data
    },
    async removeSoundclip (soundclipId) {
      const sure = await this.$bvModal.msgBoxConfirm('Are you sure?')
      if (sure) {
        await soundclipRepo.remove(soundclipId)
        await this.getSoundclips()
      }
    },
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
    addEditSoundclip (soundclipId) {
      const route = {
        name: 'AddSoundClip',
        params: { clientId: this.clientId, guildId: this.guildId, soundclipId: soundclipId }
      }
      console.log('Push to', route)
      this.$router.push(route)
    }
  }
}
</script>
