import { NextResponse } from "next/server";
import connectDB from "../../../db/connection";
import Helmets from "./models/helmetModel";
import Armors from "./models/armorModel";
import Boots from "./models/bootsModel";
import Shields from "./models/bootsModel";
import Weapons from "./models/bootsModel";

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

    return res.status(200).json({ helmets, armors, boots, shields, weapons });
  } catch (err: any) {
    console.error("Error fetching helmets:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}