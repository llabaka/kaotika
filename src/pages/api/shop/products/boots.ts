import connectDB from "../../../../../db/connection";
import Boots from "../../models/BootsModel";

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

    const boots = await Boots.find(filter);
    return res.status(200).json({ boots });
  } catch (err: any) {
    console.error("Error fetching boots:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
