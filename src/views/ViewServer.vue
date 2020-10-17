<template>
  <div>
    <h1 v-b-toggle.collapse-1 variant="primary">View Server</h1>
    <br />
    <b-container>
      <Editor-Row type="text" label="Name"       v-model="name"   required  readonly />
      <Editor-Row type="text" label="User Id"    v-model="userId" required />

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
import * as guildRepo from '../services/discordApi/guildRepo'

export default {
  name: 'ViewServer',
  components: {
    EditorRow,
    Soundboard
  },
  props: {
    clientId: String,
    guildId: String,
    bus: Object
  },
  data () {
    return {
      name: undefined,
      userId: undefined
    }
  },
  async mounted () {
    const res = await guildRepo.get(this.guildId)
    this.name = res.data.name
    this.userId = res.data.userId
  },
  methods: {
    async save () {
      const newRecord = {
        guildId: this.guildId,
        clientId: this.clientId,
        name: this.name,
        userId: this.userId
      }

      await guildRepo.set(newRecord)
      this.bus.$emit('alert', 'Successfully Saved', 'success')
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
