import * as axios from 'axios'

const search = async (query) => {
  return await axios
    .search('http://localhost:3001/guilds', {
      body: query
    })
}

const get = async (guildId) => {
  return await axios
    .get('http://localhost:3001/guilds', {
      params: {
        guildId: guildId
      }
    })
}

const set = async (record) => {
  return await axios.post('http://localhost:3001/guilds', record)
}

const remove = async (guildId) => {
  return await axios
    .delete('http://localhost:3001/guilds', {
      params: {
        guildId: guildId
      }
    })
}

export {
  search,
  get,
  set,
  remove
}
