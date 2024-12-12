import Player from "../models/PlayerModel";
// import { mockSession } from "@/__tests__/__mocks__/mockSession";
import connectDB from "../../../../db/connection";

const mockSession2: any = {
	user: {
		name: 'Asier',
		email: 'asier.arguinchona@ikasle.aeg.eus',
		image: "https://lh3.googleusercontent.com/a/ACg8ocIqIoDtJVejSbjrzV889fEhqGR-ILGc99C0-YgY88b11zuiXfk=s96-c",
	},
	accessToken: 'fake-acces-token',
	refreshToken: 'fake-refresh-token',
	expires: '',
	email: 'asier.arguinchona@ikasle.aeg.eus'
}
export default async function handlerPlayer(req: any, res: any) {
	try {

		// Connect to DB
		console.log("CONNECTED TO MONGO");
		await connectDB();

		// Obtain player
		const player = await Player.findOne({ email: mockSession2.email });
		return res.status(200).json(player);
	} catch (err: any) {
		console.error("Error fetching player:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}