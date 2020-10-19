import RepoBase from './repoBase'
const client = new RepoBase('guilds')

const search = async (query) => {
  return await client.search(query)
}

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
  search,
  get,
  set,
  remove
}
