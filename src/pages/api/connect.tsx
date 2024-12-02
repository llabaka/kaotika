import { NextResponse } from "next/server";
import connectDB from "../../../db/connection";
import Helmets from "./models/helmetModel";
import { error } from "console";

export default async function handler(req: any, res: any) {
  try {
    // Conectar a la base de datos
    await connectDB();

    console.log("CONNECTED TO MONGO");

    // Obtener datos del modelo
    const helmets = await Helmets.find();

    console.log(helmets);

    return res.status(200).json({ helmets });
  } catch (err: any) {
    console.error("Error fetching helmets:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}