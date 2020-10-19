<template>
  <div>
    <b-table striped hover :items="bots" :fields="fields" @row-clicked="botClicked">
    </b-table>
  </div>
</template>

<script>
import * as botRepo from '@/services/discordApi/botRepo'
export default {
  name: 'BotList',
  components: {},
  data () {
    return {
      fields: ['clientId', 'name'],
      bots: []
    }
  },
  methods: {
    botClicked (record, index) {
      const route = { name: 'ViewBot', params: { clientId: record.clientId } }
      console.log('pushing to', route)
      this.$router.push(route)
    }
  },
  mounted () {
    botRepo.get().then((res) => {
      this.bots = res.data
    })
  }

}
</script>
