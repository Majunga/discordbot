import * as axios from 'axios'
const url = `${process.env.VUE_APP_APIURL}/bots`
const get = async (clientId) => {
  return await axios
    .get(url, {
      params: {
        clientId: clientId
      }
    })
}

const set = async (record) => {
  return await axios.post(url, record)
}

const remove = async (clientId) => {
  return await axios
    .delete(url, {
      params: {
        clientId: clientId
      }
    })
}

export {
  get,
  set,
  remove
}
