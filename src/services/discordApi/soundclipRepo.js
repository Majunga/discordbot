import * as axios from 'axios'

const search = async (query) => {
  console.debug('Search Soundclips', query)

  const res = await axios
    .get('http://localhost:3001/soundclips/search', {
      params: query
    })
  console.debug('Search soundclip response', res)

  return res
}

const get = async (guildId) => {
  console.debug('Get Soundclip', guildId)

  const res = await axios
    .get('http://localhost:3001/soundclips', {
      params: {
        guildId: guildId
      }
    })

  console.debug('Get soundclip response', res)

  return res
}

const set = async (record) => {
  return await axios.post('http://localhost:3001/soundclips', record)
}

const remove = async (guildId) => {
  console.debug('Remove Soundclip', guildId)

  const res = await axios
    .delete('http://localhost:3001/soundclips', {
      params: {
        guildId: guildId
      }
    })

  console.debug('Remove soundclip response', res)

  return res
}

export {
  search,
  get,
  set,
  remove
}
