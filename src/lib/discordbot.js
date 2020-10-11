import { Client } from 'discord.js'
import { Check } from './check'

export class DiscordBot {
  constructor (config) {
    this.config = config
    this.client = new Client()
  }

  Login = () => {
    this.client.on('ready', () => {
      console.log('Ready!')
    })

    return this.client.login(this.config.token)
  }

  SendMessage = async (message) => {
    if (Check.hasNullOrWhitespace(message) === false) {
      const guild = await this.client.guilds.fetch(this.config.targetGuild, true, true)

      const member = await guild.members.fetch({ user: this.config.targetMember, cache: true, force: true })
      const channelId = member?.voice.channelID

      if (channelId === undefined) {
        console.error(`User isn't in a for ${guild.name} server`)
        return
      }

      const voiceChannel = guild.channels.cache.find((channel) => channel.id === channelId)
      await voiceChannel.join()

      const channel = guild.channels.cache.find((channel) => channel.id === this.config.targetChannel)

      console.log(`Sending ${message} to ${guild.name}-${channel.name}`)
      await channel.send(message)

      voiceChannel.leave()
    }
  }
}
