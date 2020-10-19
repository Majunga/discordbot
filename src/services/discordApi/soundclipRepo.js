import * as axios from 'axios'
const url = `${process.env.VUE_APP_APIURL}/soundclips`

const search = async (query) => {
  console.debug('Search Soundclips', query)

  const res = await axios
    .get(`${url}/search`, {
      params: query
    })
  console.debug('Search soundclip response', res)

  return res
}

const get = async (soundclipId) => {
  console.debug('Get Soundclip', soundclipId)

  const res = await axios
    .get(url, {
      params: {
        soundclipId: soundclipId
      }
    })

  console.debug('Get soundclip response', res)

  return res
}

const set = async (record) => {
  return await axios.post(url, record)
}

const remove = async (soundclipId) => {
  console.debug('Remove Soundclip', soundclipId)

  const res = await axios
    .delete(url, {
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
