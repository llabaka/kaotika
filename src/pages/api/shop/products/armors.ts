import connectDB from "../../../../../db/connection";
import Armors from "../../models/ArmorModel";

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

    const armors = await Armors.find(filter);
    return res.status(200).json({ armors });
  } catch (err: any) {
    console.error("Error fetching armors:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
