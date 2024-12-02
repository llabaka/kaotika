import connectDB from "../../../db/connection";

export default async function handler(req: any, res: any) {
    await connectDB()
    
    console.log("CONNECTED TO MONGO");
    
   
    res.status(200).json({ done: true })
  }