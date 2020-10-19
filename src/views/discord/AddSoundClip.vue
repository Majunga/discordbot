<template>
  <div>
    <h1>{{this.soundclipId ? 'Edit' : 'Add'}} soundclip</h1>
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
import EditorRow from '@/components/controls/EditorRow'
import * as soundclipRepo from '@/services/discordApi/soundclipRepo'
import { newId } from '@/lib/Util'

export default {
  name: 'AddSoundClip',
  components: {
    EditorRow
  },
  props: {
    clientId: String,
    guildId: String,
    soundclipId: String
  },
  data () {
    return {
      name: undefined,
      url: undefined,
      imageUrl: undefined
    }
  },
  async mounted () {
    if (this.soundclipId) {
      const res = await soundclipRepo.get(this.soundclipId)
      this.name = res.data?.name
      this.url = res.data?.url
      this.imageUrl = res.data?.imageUrl
    }
  },
  methods: {
    async save () {
      const newRecord = {
        soundclipId: this.soundclipId ?? newId(),
        clientId: this.clientId,
        guildId: this.guildId,
        name: this.name,
        url: this.url,
        imageUrl: this.imageUrl
      }

      await soundclipRepo.set(newRecord)
      this.$router.go(-1)
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
