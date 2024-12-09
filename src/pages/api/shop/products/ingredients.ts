import connectDB from "../../../../../db/connection";
import Ingredients from "../../models/IngredientsModel";

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

    const ingredients = await Ingredients.find(filter);
    return res.status(200).json({ ingredients });
  } catch (err: any) {
    console.error("Error fetching ingredients:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
