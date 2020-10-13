import * as axios from 'axios'

const guilds = async (token) => {
  console.log('Get Guilds')
  return axios
    .get('http://localhost:3000/guilds', {
      headers: { authorization: token }
    })
}

const joinVoiceAndSendMessage = async (token, data) => {
  return axios.post('http://localhost:3000/joinvoiceandsendmessage', data, {
    headers: { authorization: token }
  })
}

const sendMessage = async (token, data) => {
  return axios.post('http://localhost:3000/message', data, {
    headers: { authorization: token }
  })
}

export {
  guilds,
  joinVoiceAndSendMessage,
  sendMessage
}
