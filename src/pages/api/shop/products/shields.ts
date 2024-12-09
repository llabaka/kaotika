import connectDB from "../../../../../db/connection";
import Shields from "../../models/ShieldsModel";

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

    const shields = await Shields.find(filter);
    return res.status(200).json({ shields });
  } catch (err: any) {
    console.error("Error fetching shields:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
