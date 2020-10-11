#!/usr/bin/env node
import { Command } from 'commander'
import { StartUp } from './startup'
import { DiscordClient } from "./discordclient"
import { CommandLoader } from "./commandloader"

StartUp.Run();
const client = new DiscordClient()

client.Login().then(() => {

    const program = new Command()

    const commandLoader = new CommandLoader(program, client)

    const post = commandLoader.CreateCommand("post [message]", "post message to discord", 
        (message: string) => {
            client.SendMessage(message)?.then(() => {
                process.exit()
            }) ?? process.exit()
    })

    commandLoader.LoadCommands()

    program
        .addCommand(post)
        .parse(process.argv)


})
