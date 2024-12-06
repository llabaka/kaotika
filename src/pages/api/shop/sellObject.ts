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

        // Eliminar el producto del inventario del jugador
        const inventoryCategory = player.inventory[type];
        if (!inventoryCategory || !Array.isArray(inventoryCategory)) {
            return res.status(400).send({
                error: `Inventory category ${type} not found for player`,
        });
        }

        const itemIndex = inventoryCategory.findIndex((item: any) => item._id.toString() === productId);
        if (itemIndex === -1) {
            return res.status(400).send({
            error: `Item with id ${productId} not found in player's inventory`,
        });
        }

        inventoryCategory.splice(itemIndex, 1); // Eliminar el ítem

        // Sumar el valor del producto al oro del jugador
        const sellingPrice = Math.floor(product.value / 3);

        player.gold += sellingPrice;

        // Guardar los cambios
        await player.save();

        return res.status(200).send({
            status: "OK",
            data: player
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