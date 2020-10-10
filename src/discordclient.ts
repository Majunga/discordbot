import { WebhookClient } from "discord.js";
import { Check } from "./check"

export class DiscordClient {
    private _client: WebhookClient;
    constructor(){
        const id = Check.isDefined(process.env.webhookId, "No webhookId defined in env")
        const token = Check.isDefined(process.env.webhookToken, "No webhookToken defined in env")
        this._client = new WebhookClient(id, token)
    }

    public SendMessage(message:string) {
        if (Check.hasNullOrWhitespace(message) === false) {
            return this._client.send(message)
        }
    }
}