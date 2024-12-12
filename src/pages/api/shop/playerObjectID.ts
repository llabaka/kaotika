import Player from "../models/PlayerModel";
import connectDB from "../../../../db/connection";

export default async function handleObjectIdPlayer(req: any, res: any) {
  try {
    // Connect to DB
    console.log("CONNECTED TO MONGO");
    await connectDB();

    // Obtain player
    const player = await Player.findOne({ req });

    // Check if player exists
    if (!player) {
      console.error("Player was not found");
      return res.status(404).json({ error: "Player was not found" });
    }

    return res.status(200).json(player);
  } catch (err: any) {
    console.error("Error fetching player:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}