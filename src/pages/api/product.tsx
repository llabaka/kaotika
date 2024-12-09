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
    console.log("CONNECTED TO MONGO TO FETCH ALL PRODUCTS");
    await connectDB();

    const filter = {
      $and: [
        { isUnique: { $ne: true } },        // Exclude if isUnique is true
        { value: { $ne: 0 } },              // Exclude if value is 0
        { value: { $exists: true } },       // Exclude if value does not exist
      ]
    };

    // Obtain products
    const helmets = await Helmets.find(filter);
    const armors = await Armors.find(filter);
    const boots = await Boots.find(filter);
    const shields = await Shields.find(filter);
    const weapons = await Weapons.find(filter);
    const rings = await Rings.find(filter);
    const artifacts = await Artifacts.find(filter);
    const ingredients = await Ingredients.find(filter);


    return res.status(200).json({ helmets, armors, boots, shields, weapons, artifacts, ingredients, rings });
  } catch (err: any) {
    console.error("Error fetching:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
