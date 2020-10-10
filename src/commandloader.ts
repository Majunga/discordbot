import Commander from "commander"
import config from "./commandconfig.json"
import { DiscordClient } from "./discordclient"



export class CommandLoader {
    private _commander: Commander.Command
    private _client: DiscordClient
    constructor(commander:Commander.Command, client:DiscordClient){
        this._commander = commander
        this._client = client
    }

    public LoadCommands(){
        config.forEach((value) => {
            const cmd = this.CreateCommand(
                value.name, 
                value.description, 
                () => this.sendMessage(value.message))
            
            this._commander.addCommand(cmd)
        })
    }
        
    public CreateCommand = (command:string, description:string, func: (...args: any[]) => void | Promise<void>) => {
        return new Commander.Command()
        .command(command)
        .description(description)
        .action(func)
    }

    private sendMessage = (message: string) => {
        this._client.SendMessage(message)?.then(() => {
            process.exit();
        })
    }
}