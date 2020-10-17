<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png">
    <br/>
    <b-button variant="success" @click="addbot()">Add bot</b-button>
    <br/>
    <br/>
    <BotList />
  </div>

</template>

<script>
// @ is an alias to /src
import BotList from '@/components/BotList.vue'

export default {
  name: 'Home',
  components: {
    BotList
  },
  methods: {
    addbot () {
      this.$router.push({ path: '/addbot' })
    }
  }

}
</script>
