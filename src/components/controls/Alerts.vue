<template>
    <div>
      <b-alert fade :show="showAlert" :variant="messageVariant">{{this.message}}</b-alert>
    </div>
</template>
<script>
export default {
  name: 'Alerts',
  props: {
    bus: Object
  },
  data () {
    return {
      showAlert: false,
      message: undefined,
      messageVariant: undefined
    }
  },
  mounted () {
    this.bus.$on('alert', this.showAlertMessage)
    this.bus.$on('clearalert', this.clearAlert)
  },
  methods: {
    /**
     * @typedef variant
     * @property {string} Info "info"
     * @property {string} Danger "danger"
     * @property {string} Warning "warning"
     * @property {string} Success "success"
     */
    /** Show an alert to the user
     * @param {boolean} - Show alert
     * @param {message} - Message to show
     * @param {variant} - Alert type
    */
    showAlertMessage (message, variant) {
      console.debug('Show Alert', { message, variant })
      this.showAlert = true
      this.message = message
      this.messageVariant = variant

      setTimeout(this.clearAlert, 5000)
    },
    clearAlert () {
      console.debug('Clear Alert')
      this.showAlert = false
      this.message = undefined
      this.messageVariant = undefined
    }
  }
}
</script>
