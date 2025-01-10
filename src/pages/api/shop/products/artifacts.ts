import connectDB from "../../../../../db/connection";
import Talismans from "../../models/ArtifactsModel";

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

    const artifacts = await Talismans.find(filter);
    console.log("TALISMANS");
    console.log(artifacts);

    return res.status(200).json({ artifacts });
  } catch (err: any) {
    console.error("Error fetching artifacts:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
