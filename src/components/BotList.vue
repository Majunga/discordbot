<template>
  <div>
    <b-table striped hover :items="bots" :fields="fields" @row-clicked="botClicked">
    </b-table>
  </div>
</template>

<script>
import { BotRepo } from '../repos/BotRepo'
const botRepo = new BotRepo()
export default {
  name: 'BotList',
  components: {},
  data () {
    const bots = botRepo.get()
    console.log(bots)
    return {
      fields: ['clientId', 'name'],
      bots: bots
    }
  },
  methods: {
    botClicked (record, index) {
      const route = { name: 'ViewBot', params: { clientId: record.clientId } }
      console.log('pushing to', route)
      this.$router.push(route)
    }
  }
}
</script>
