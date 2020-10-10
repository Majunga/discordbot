#!/usr/bin/env node
import { Command } from 'commander'
import { StartUp } from './startup'
import { DiscordClient } from "./discordclient"
import { Check } from "./check"

StartUp.Run();
const client = new DiscordClient()

const SendMessage = (message: string) => {
    client.SendMessage(message)?.then(() => {
        process.exit();
    })
}

const createCommand = (command:string, description:string, func: (...args: any[]) => void | Promise<void>) => {
    return new Command()
    .command(command)
    .description(description)
    .action(func)
}

const post = createCommand("post [message]", "post message to discord", 
    (message: string) => {
        SendMessage(message);
    })

const dundundun = createCommand("mario", "post mario death to disc", 
    () => {
        SendMessage("--play https://youtu.be/hom9faSBUHQ");
    })

new Command()
    .addCommand(post)
    .addCommand(dundundun)
    .parse(process.argv)



