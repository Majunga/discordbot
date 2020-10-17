import * as axios from 'axios'

const get = async (clientId) => {
  return await axios
    .get('http://localhost:3001/bots', {
      params: {
        clientId: clientId
      }
    })
}

const set = async (record) => {
  return await axios.post('http://localhost:3001/bots', record)
}

const remove = async (clientId) => {
  return await axios
    .delete('http://localhost:3001/bots', {
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
