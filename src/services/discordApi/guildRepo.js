import * as axios from 'axios'

const search = async (query) => {
  console.debug('Search Guilds', query)

  const res = await axios
    .get('http://localhost:3001/guilds/search', {
      params: query
    })
  console.debug('Search guild response', res)

  return res
}

const get = async (guildId) => {
  console.debug('Get Guild', guildId)

  const res = await axios
    .get('http://localhost:3001/guilds', {
      params: {
        guildId: guildId
      }
    })

  console.debug('Get guild response', res)

  return res
}

const set = async (record) => {
  return await axios.post('http://localhost:3001/guilds', record)
}

const remove = async (guildId) => {
  console.debug('Remove Guild', guildId)

  const res = await axios
    .delete('http://localhost:3001/guilds', {
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
