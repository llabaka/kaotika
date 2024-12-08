import connectDB from "../../../../../db/connection";
import Artifacts from "../../models/ArtifactsModel";

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

    const artifacts = await Artifacts.find(filter);
    return res.status(200).json({ artifacts });
  } catch (err: any) {
    console.error("Error fetching artifacts:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
