<template>
  <div>
    <h1>Add soundclip</h1>
    <br />

    <b-container>
      <Editor-Row type="text" label="Name"      v-model="name"     required />
      <Editor-Row type="text" label="Url"       v-model="url"      required />
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
import { SoundclipRepo } from '../repos/SoundclipRepo'
import { newId } from '../lib/Util'
const soundclipRepo = new SoundclipRepo()

export default {
  name: 'AddSoundClip',
  components: {
    EditorRow
  },
  props: {
    clientId: String,
    guildId: String
  },
  data () {
    return {
      name: undefined,
      url: undefined,
      imageUrl: undefined
    }
  },
  methods: {
    save () {
      const newRecord = {
        soundclipId: newId(),
        clientId: this.clientId,
        guildId: this.guildId,
        name: this.name,
        url: this.url,
        imageUrl: this.imageUrl
      }

      soundclipRepo.set(newRecord)
      this.$router.go(-1)
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
