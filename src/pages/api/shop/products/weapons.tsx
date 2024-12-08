import connectDB from "../../../../../db/connection";
import Weapons from "../../models/WeaponsModel";

export default async function handler(req: any, res: any) {
  try {
    await connectDB();

    const filter = {
      $and: [
        { isUnique: { $ne: true } },
        { value: { $ne: 0 } },
        { value: { $exists: true } },
      ],
    };

    const weapons = await Weapons.find(filter);
    return res.status(200).json({ weapons });
  } catch (err: any) {
    console.error("Error fetching weapons:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
