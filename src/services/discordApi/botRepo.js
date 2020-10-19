import RepoBase from './repoBase'
const client = new RepoBase('bots')

const get = async (clientId) => {
  return await client.get(clientId)
}

const set = async (record) => {
  return await client.post(record)
}

const remove = async (clientId) => {
  return await client.delete(clientId)
}

export {
  get,
  set,
  remove
}
