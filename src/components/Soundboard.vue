<template>
    <div>
        <b-button variant="success" @click="addSoundclip()">Add Soundclip</b-button>

        <div v-for="(soundclip) in soundclips" v-bind:key="soundclip.clientId">
          <b-card @click="play(soundclip)"
            :img-src="soundclip.imageUrl"
            style="max-width: 10rem">
            {{soundclip.name}}
          </b-card>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Soundboard',
  props: {
    clientId: String
  },
  data () {
    const soundclips = JSON.parse(localStorage.soundclips)
    console.log(soundclips)
    return {
      soundclips: soundclips
    }
  },
  methods: {
    play (soundclip) {

    },
    addSoundclip () {
      const route = { name: 'AddSoundClip', params: { clientId: this.clientId } }
      console.log('Push to', route)
      this.$router.push(route)
    }
  }
}
</script>
