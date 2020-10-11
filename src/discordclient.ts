import { Channel, Client, Guild, GuildMember, Collection, Snowflake, GuildChannel, TextChannel, FetchMemberOptions, VoiceChannel } from "discord.js";
import { Check } from "./check"
import { List } from "./list"

declare class member {
    key:string
    member:GuildMember
}

export class DiscordClient {
    private _client: Client;
    private _token: any;
    private _targetChannel: any;
    private _targetGuild: any;
    private _targetMember: any;
    constructor(){
        this._token = Check.isDefined(process.env.token, "No token defined in env")
        this._targetChannel = Check.isDefined(process.env.targetChannel, "No target channel defined in env")
        this._targetGuild = Check.isDefined(process.env.targetGuild, "No target guild defined in env")
        this._targetMember = Check.isDefined(process.env.targetMember, "No target member defined in env")
        this._client = new Client()
    }

    public Login(){
        this._client.on("ready", () => {
            console.log("Ready!")
        })

        return this._client.login(this._token)
    }

    public async SendMessage(message:string) {
        if (Check.hasNullOrWhitespace(message) === false) {
            const guild = await this._client.guilds.fetch(this._targetGuild, true, true)

            const member = await guild.members.fetch( { user: this._targetMember, cache: true, force: true } )
            const channelId = member?.voice.channelID
            
            if(channelId === undefined){
                console.error(`User isn't in a for ${guild.name} server`)
                return;
            }


            const voiceChannel = guild.channels.cache.find((channel:GuildChannel) => channel.id == channelId) as VoiceChannel
            await voiceChannel.join()

            const channel = guild.channels.cache.find((channel:GuildChannel) => channel.id == this._targetChannel) as TextChannel



            console.log(`Sending ${message} to ${guild.name}-${channel.name}`)
            await channel.send(message)

            voiceChannel.leave()
        }1
    }
}