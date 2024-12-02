import { NextResponse } from "next/server";
import connectDB from "../../../db/connection";
import Helmets from "./models/HelmetModel";
import Armors from "./models/ArmorModel";
import Boots from "./models/BootsModel";
import Shields from "./models/ShieldsModel";
import Weapons from "./models/WeaponsModel";
import Rings from "./models/RingsModel";
import Artifacts from "./models/ArtifactsModel";
import Ingredients from "./models/IngredientsModel";

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

    return res.status(200).json({ helmets, armors, boots, shields, weapons, artifacts, ingredients, rings });
  } catch (err: any) {
    console.error("Error fetching helmets:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}