import connectDB from "../../../db/connection";
import Armors from "./models/ArmorModel";
import Artifacts from "./models/ArtifactsModel";
import Boots from "./models/BootsModel";
import Helmets from "./models/HelmetModel";
import Ingredients from "./models/IngredientsModel";
import Rings from "./models/RingsModel";
import Shields from "./models/ShieldsModel";
import Weapons from "./models/WeaponsModel";

export default async function handler(req: any, res: any) {
  try {
    // Connect to DB
    console.log("CONNECTED TO MONGO");
    await connectDB();

    // Obtain products
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
    console.error("Error fetching:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
