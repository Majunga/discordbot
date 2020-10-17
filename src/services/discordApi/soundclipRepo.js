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

const get = async (soundclipId) => {
  console.debug('Get Soundclip', soundclipId)

  const res = await axios
    .get('http://localhost:3001/soundclips', {
      params: {
        soundclipId: soundclipId
      }
    })

  console.debug('Get soundclip response', res)

  return res
}

const set = async (record) => {
  return await axios.post('http://localhost:3001/soundclips', record)
}

const remove = async (soundclipId) => {
  console.debug('Remove Soundclip', soundclipId)

  const res = await axios
    .delete('http://localhost:3001/soundclips', {
      params: {
        soundclipId: soundclipId
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
