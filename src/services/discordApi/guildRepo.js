import * as axios from 'axios'
const url = `${process.env.VUE_APP_APIURL}/guilds`

const search = async (query) => {
  console.debug('Search Guilds', query)

  const res = await axios
    .get(`${url}/search`, {
      params: query
    })
  console.debug('Search guild response', res)

  return res
}

const get = async (guildId) => {
  console.debug('Get Guild', guildId)

  const res = await axios
    .get(url, {
      params: {
        guildId: guildId
      }
    })

  console.debug('Get guild response', res)

  return res
}

const set = async (record) => {
  return await axios.post(url, record)
}

const remove = async (guildId) => {
  console.debug('Remove Guild', guildId)

  const res = await axios
    .delete(url, {
      params: {
        guildId: guildId
      }
    })

  console.debug('Remove guild response', res)

  return res
}

export {
  search,
  get,
  set,
  remove
}
