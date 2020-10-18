import * as axios from 'axios'

const login = async (username, password) => {
  return await axios
    .post('http://localhost:3001/account/login', {
      username: username,
      password: password
    })
}

export {
  login
}
