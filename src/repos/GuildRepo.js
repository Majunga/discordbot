import { BaseRepo } from './BaseRepo'

export class GuildRepo extends BaseRepo {
  constructor () {
    super('guilds', 'guildId')
  }
}
