
import Player from "./models/PlayerModel";
import { mockSession } from "../_app";
import connectDB from "../../../../db/connection";


export default async function handlerPlayer(req: any, res: any) {
    try {

        // Connect to DB
        console.log("CONNECTED TO MONGO");
        await connectDB();

        // Obtain player
        const player = await Player.findOne({email: mockSession.email});
        
        return res.status(200).json( player );
        } catch (err: any) {
        console.error("Error fetching player:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}