import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: process.env.VUE_APP_APIURL,
  json: true
})

class RepoBase {
  constructor (urlPath) {
    this.path = urlPath
  }

  async execute (method, resource, data) {
    // inject the accessToken for each request
    const accessToken = await Vue.prototype.$auth.getAccessToken()
    const options = {
      method,
      url: resource,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }

    if (data && method === 'post') {
      options.data = data
    } else {
      options.params = data
    }

    return client(options)
      .then(res => {
        console.debug(`${method} ${resource} Request response`, res)
        return res
      })
  }

  search = (query) => {
    return this.execute('get', `${this.path}/search`, query)
  }

  get = (id) => {
    return this.execute('get', `${this.path}/${id ?? ''}`)
  }

  post = (data) => {
    return this.execute('post', this.path, data)
  }

  delete = (id) => {
    return this.execute('delete', `${this.path}/${id}`)
  }
}

export default RepoBase
