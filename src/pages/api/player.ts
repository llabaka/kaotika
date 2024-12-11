
import Player from "./models/PlayerModel";
// import { mockSession } from "@/__tests__/__mocks__/mockSession";
import connectDB from "../../../db/connection";

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
        console.log("Connecting to mongo...");
        await connectDB();
        console.log("Connected to mongo.");

        const player = await Player.findOne({email: mockSession.email});

        if (!player) {
            console.error("Player was not found");
            return res.status(404).json({ error: "Player was not found" });
        }

        const populatedPlayer = await populatePlayer(player.email);

        console.log("PLAYER ID AFTER POPULATE");
        console.log(populatedPlayer._id);

        return res.status(200).json(populatedPlayer);
    } catch (err: any) {
        console.error("Error fetching player:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const populatePlayer = async (email: string) => {
    
    console.log("ABOUT TO POPULATE PLAYER");
    
    const playerPopulated = await Player.findOne({email: email}).populate('profile').exec();

    if (!playerPopulated) {
        throw new Error("Player was not found");
      }

    console.log("PLAYER BEFORE POPULATED");
    console.log(playerPopulated);

    // Poblamos el equipo
    await playerPopulated.equipment.populate('armor', { 'profiles': 0 });
    await playerPopulated.equipment.populate('weapon', { 'profiles': 0 });
    await playerPopulated.equipment.populate('artifact', { 'profiles': 0 });
    // await playerPopulated.equipment.populate('healing_potion', { 'profiles': 0 });
    // await playerPopulated.equipment.populate('antidote_potion', { 'profiles': 0 });
    // await playerPopulated.equipment.populate('enhancer_potion', { 'profiles': 0 });
    // await playerPopulated.equipment.antidote_potion.populate('recovery_effect');
    await playerPopulated.equipment.populate('ring', { 'profiles': 0 });
    await playerPopulated.equipment.populate('helmet', { 'profiles': 0 });
    await playerPopulated.equipment.populate('shield', { 'profiles': 0 });
    await playerPopulated.equipment.populate('boot', { 'profiles': 0 });

    // Poblamos el inventario
    await playerPopulated.inventory.populate('helmets', { 'profiles': 0 });
    await playerPopulated.inventory.populate('shields', { 'profiles': 0 });
    await playerPopulated.inventory.populate('weapons', { 'profiles': 0 });
    await playerPopulated.inventory.populate('boots', { 'profiles': 0 });
    await playerPopulated.inventory.populate('rings', { 'profiles': 0 });
    await playerPopulated.inventory.populate('armors', { 'profiles': 0 });
    await playerPopulated.inventory.populate('artifacts', { 'profiles': 0 });
    // await playerPopulated.inventory.populate('healing_potions', { 'profiles': 0 });
    // await playerPopulated.inventory.populate('antidote_potions', { 'profiles': 0 });
    // await playerPopulated.inventory.populate('antidote_potions.recovery_effect', { 'profiles': 0 });
    // await playerPopulated.inventory.populate('enhancer_potions', { 'profiles': 0 });
    await playerPopulated.inventory.populate('ingredients', { 'profiles': 0 });

    return playerPopulated;
}