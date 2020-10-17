import * as axios from 'axios'

const guilds = async (token) => {
  console.log('Get Guilds')
  return axios
    .get('http://localhost:3001/discord/guilds', {
      headers: { authorization: token }
    })
}

const playmusic = async (token, data) => {
  return axios.post('http://localhost:3001/playmusic', data, {
    headers: { authorization: token }
  })
}

const sendMessage = async (token, data) => {
  return axios.post('http://localhost:3001/message', data, {
    headers: { authorization: token }
  })
}

export {
  guilds,
  playmusic,
  sendMessage
}
