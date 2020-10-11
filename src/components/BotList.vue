<template>
  <div>
    <b-table striped hover :items="bots" :fields="fields" @row-clicked="botClicked">
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'BotList',
  components: {},
  data () {
    const bots = JSON.parse(localStorage.bots)
    console.log(bots)
    return {
      fields: ['clientId', 'name'],
      bots: bots
    }
  },
  methods: {
    botClicked (record, index) {
      const route = { name: 'ViewBot', params: { clientId: record.clientId, name: record.name, token: record.token } }
      console.log('pushing to', route)
      this.$router.push(route)
    }
  }
}
</script>
