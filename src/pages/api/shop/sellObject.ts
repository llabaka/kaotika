import connectDB from "../../../../db/connection";
import PlayerModel from "../models/PlayerModel";
import { NextApiRequest, NextApiResponse } from "next";
import ArmorModel from "../models/ArmorModel";
import ArtifactsModel from "../models/ArtifactsModel";
import BootsModel from "../models/BootsModel";
import HelmetModel from "../models/HelmetModel";
import IngredientsModel from "../models/IngredientsModel";
import RingsModel from "../models/RingsModel";
import ShieldsModel from "../models/ShieldsModel";
import WeaponsModel from "../models/WeaponsModel";
import { Product } from "@/_common/interfaces/shop/Product";
import { populatePlayer } from "../player";

const modelMap : Record<string, any> = {
    armor: ArmorModel,
    artifact: ArtifactsModel,
    boot: BootsModel,
    helmet: HelmetModel,
    ring: RingsModel,
    shield: ShieldsModel,
    weapon: WeaponsModel,
    ingredient: IngredientsModel,
}

export default async function handlerSell(req : NextApiRequest, res : NextApiResponse) {
    
    const { playerId, productId, type } = req.body;

    if(!playerId || !productId || !type){
        return res.status(400).json({
            error: `Faltan parametros requeridos playerId: ${playerId} productId: ${productId} type : ${type}`
        });
    }

    try {
        // Connect TO DB
        connectDB();

        // Search player
        const player = await PlayerModel.findById(playerId);
        if(!player){
            return res.status(404).send({
                error: `Player with the id ${playerId} not found`
            });
        }

        // Search product in DB
        const product = await searchProductByType(type, productId);
        if(!product){
            return res.status(404).send({
                error: `Product with the id ${productId} with type ${type} not found`
            });
        }

        // Delete the product of player inventory
        const inventoryCategory = type + "s";
        if(!player.inventory[inventoryCategory]){
            return res.status(400).send({
                error: `Inventory category ${inventoryCategory} not exists`
            });
        }
        
        // Check if product is in inventory
        const index = player.inventory[inventoryCategory].findIndex((item: any) => item.toString() === productId);
        
        if (index === -1) {
            return res.status(400).send({
                error: `Product with id ${productId} not found in inventory category ${inventoryCategory}`
            });
        }

        // Delete the product
        player.inventory[inventoryCategory].splice(index, 1);

        // Add gold
        const sellingPrice = Math.floor(product.value / 3);

        player.gold += sellingPrice;

        // Save player changes
        await player.save();

        const playerPopulated = await populatePlayer();

        return res.status(200).send({
            status: "OK",
            data: playerPopulated
        })
    }
    catch (error){

        console.error("Error during the buy: ", error);
        return res.status(500).send({
            error: "Intern error of server"
        });
    }
}

const searchProductByType = async (type: string, productId: string) => {

    const Model = modelMap[type];

    if(!Model){
        throw new Error(`Type of product not expected: ${type}`);
    }

    return await Model.findById(productId);
}