import { BaseRepo } from './BaseRepo'

export class BotRepo extends BaseRepo {
  constructor () {
    super('bots', 'clientId')
  }
}
