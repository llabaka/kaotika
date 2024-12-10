
import Player from "./models/PlayerModel";
import { mockSession } from "../_app";
import connectDB from "../../../db/connection";


export default async function handlerPlayer(req: any, res: any) {
    try {

        // Connect to DB
        console.log("CONNECTED TO MONGO TO FETCH PLAYER");
        await connectDB();

        const populatedPlayer = await populatePlayer();

        console.log("PLAYER ID AFTER POPULATE");
        console.log(populatedPlayer._id);

        return res.status(200).json(populatedPlayer);
        } catch (err: any) {
        console.error("Error fetching player:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
        }
}

export const populatePlayer = async () => {
    
    const playerPopulated = await Player.findOne({email: mockSession.email}).populate('profile').exec();

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