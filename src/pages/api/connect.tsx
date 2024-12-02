import { NextResponse } from "next/server";
import connectDB from "../../../db/connection";
import Helmet from "./models/helmetModel";
import { error } from "console";

export default async function handler(req: any, res: any) {

    const connected = await connectDB()

    //console.log(connected);
    
    if (connected){
      console.log("CONNECTED TO MONGO");

      try {
        const helmets = await Helmet.find({});
  
        NextResponse.json({helmets});
      } catch (err: any) {
        NextResponse.json({error: err.message})
      }
    }
    else {
      console.log("NO SE HA CONECTADO");
      
      console.log(error);
    }

    res.status(200).json({done: true})
  }