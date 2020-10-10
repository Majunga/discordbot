import * as env from "dotenv"

export class StartUp {
    
    public static Run(): void{
        env.config()
    }
}
