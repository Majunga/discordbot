import { isDefined, checkIsDefined } from '../lib/Check'

export class BaseRepo {
  constructor (repoName, idName) {
    this.repoName = repoName
    this.idName = idName
  }

  get = (id) => {
    const records = JSON.parse(localStorage.getItem(this.repoName)) ?? []

    if (isDefined(id)) {
      return records.find(record => record[this.idName] === id)
    }

    return records
  }

  set = (record) => {
    checkIsDefined(record)
    checkIsDefined(record[this.idName])
    const oldRecord = this.get(record[this.idName])
    const records = this.get()

    if (isDefined(oldRecord)) {
      const newRecords = records.filter(b => b[this.idName] !== record[this.idName])

      newRecords.push(record)

      localStorage.setItem(this.repoName, JSON.stringify(newRecords))
    } else {
      records.push(record)

      localStorage.setItem(this.repoName, JSON.stringify(records))
    }
  }

  remove = (id) => {
    const records = this.get()
    const newRecords = records.filter(b => b.clientId !== id)
    localStorage.setItem(this.repoName, JSON.stringify(newRecords))
  }
}
