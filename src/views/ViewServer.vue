<template>
  <div>
    <h1 v-b-toggle.collapse-1 variant="primary">View Server</h1>
    <br />
    <b-container>
      <Editor-Row type="text" label="Name"       v-model="name"      required  readonly />
      <Editor-Row type="text" label="Channel Id" v-model="channelId" required />
      <Editor-Row type="text" label="User Id"    v-model="userId"    required />

      <b-button-group class="float-right">
        <b-button type="button" variant="success" @click="save()"
          >Save</b-button
        >
        <b-button type="button" @click="back()">back</b-button>
      </b-button-group>
      <br />
      <hr />
    </b-container>
    <b-container>
      <Soundboard :clientId="clientId" :guildId="guildId" />
    </b-container>
  </div>
</template>

<script>
import EditorRow from '../components/controls/EditorRow'
import Soundboard from '../components/Soundboard'
import { GuildRepo } from '../repos/GuildRepo'
const guildRepo = new GuildRepo()

export default {
  name: 'ViewServer',
  components: {
    EditorRow,
    Soundboard
  },
  props: {
    clientId: String,
    guildId: String
  },
  data () {
    const guild = guildRepo.get(this.guildId)

    return {
      name: guild?.name,
      channelId: guild?.channelId,
      userId: guild?.userId
    }
  },
  methods: {
    save () {
      const newRecord = {
        guildId: this.guildId,
        clientId: this.clientId,
        name: this.name,
        channelId: this.channelId,
        userId: this.userId
      }

      guildRepo.set(newRecord)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
