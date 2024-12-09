import connectDB from "../../../../../db/connection";
import Rings from "../../models/RingsModel";

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

    const rings = await Rings.find(filter);
    return res.status(200).json({ rings });
  } catch (err: any) {
    console.error("Error fetching rings:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
