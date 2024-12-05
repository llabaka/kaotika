import connectDB from "../../../db/connection";
import { mockSession } from "../_app";
import Armors from "./models/ArmorModel";
import Artifacts from "./models/ArtifactsModel";
import Boots from "./models/BootsModel";
import Helmets from "./models/HelmetModel";
import Ingredients from "./models/IngredientsModel";
import Player from "./models/PlayerModel";
import Rings from "./models/RingsModel";
import Shields from "./models/ShieldsModel";
import Weapons from "./models/WeaponsModel";

export default async function handler(req: any, res: any) {
  try {
    // Conectar a la base de datos
    await connectDB();

    console.log("CONNECTED TO MONGO");

    // Obtener datos del modelo
    const helmets = await Helmets.find();
    const armors = await Armors.find();
    const boots = await Boots.find();
    const shields = await Shields.find();
    const weapons = await Weapons.find();
    const rings = await Rings.find();
    const artifacts = await Artifacts.find();
    const ingredients = await Ingredients.find();

    const player = await Player.findOne({email: mockSession.email});
    console.log("PLAYER OBJECT");
    console.log(player);

    return res.status(200).json({ helmets, armors, boots, shields, weapons, artifacts, ingredients, rings });
  } catch (err: any) {
    console.error("Error fetching:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}