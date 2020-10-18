/* eslint-disable standard/no-callback-literal */
/* globals localStorage */
import * as account from './accountApi'

export default {
  async login (username, password) {
    console.debug(`Login for ${username} ${password}`)
    const result = await account.login(username, password)
    console.debug('Login result', result.data)

    if (result.data.loggedIn) {
      localStorage.token = result.data.token
    }
    console.debug('Failed to login')

    this.onChange(result.data.loggedIn)
    return result.data.loggedIn
  },

  getToken () {
    return localStorage.token
  },

  logout () {
    delete localStorage.token
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {}
}
