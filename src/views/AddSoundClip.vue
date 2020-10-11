<template>
  <div>
    <h1>Add soundclip</h1>
    <br />

    <b-container>
      <Editor-Row type="text" label="Name"  v-model="name" required />
      <Editor-Row type="text" label="Url"  v-model="url" required />
      <Editor-Row type="text" label="Image Url" v-model="imageUrl" required />
      <hr />
      <b-button-group class="float-right">
        <b-button type="button" variant="success" @click="save()">Save</b-button>
        <b-button type="button" @click="cancel()">Cancel</b-button>
      </b-button-group>
    </b-container>
  </div>
</template>

<script>
import EditorRow from '../components/controls/EditorRow'

export default {
  name: 'AddSoundClip',
  components: {
    EditorRow
  },
  props: {
    clientId: String,
    name: String,
    url: String,
    imageUrl: String
  },
  methods: {
    save () {
      const soundclips = JSON.parse(localStorage.getItem('soundclips')) ?? []

      soundclips.push({
        clientId: this.clientId,
        name: this.name,
        url: this.url,
        imageUrl: this.imageUrl
      })

      console.log(soundclips)

      localStorage.setItem('soundclips', JSON.stringify(soundclips))

      this.$router.go(-1)
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
