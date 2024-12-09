import connectDB from "../../../../../db/connection";
import Helmets from "../../models/HelmetModel";

export default async function handler(req: any, res: any) {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Filtro para excluir productos no deseados
    const filter = {
      $and: [
        { isUnique: { $ne: true } },
        { value: { $ne: 0 } },
        { value: { $exists: true } },
      ],
    };

    const helmets = await Helmets.find(filter);
    return res.status(200).json({ helmets });
  } catch (err: any) {
    console.error("Error fetching helmets:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
