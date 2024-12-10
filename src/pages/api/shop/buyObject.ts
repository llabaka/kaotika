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

interface Ingredient {
    qty: number;
    productId: string
}

export default async function handlerBuy(req : NextApiRequest, res : NextApiResponse) {
    
    const { playerId, products} = req.body;

    if(!playerId || !products || products.length === 0){
        return res.status(400).send({
            error: `Faltan parametros requeridos playerId: ${playerId} products: ${products}`
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

        let totalCost = 0;
        const purchasedProducts = [];
        
        for(const {type, productId, qty} of products){
            // Search product in DB
            const product = await searchProductByType(type, productId);
            if(!product){
                return res.status(404).send({
                    error: `Product with the id ${productId} with type ${type} not found`
                });
            }

            if(type !== 'ingredient') {
                if(player.level < product.min_lvl){
                    return res.status(400).send({
                        error: `The player level ${player.level} is lower to buy ${product.min_lvl}`
                    });
                }

                const existingProduct = player.inventory[type+'s'].find((item : Product) => item._id === productId);
                if(!existingProduct){
                    return res.status(400).send({
                        error: `The player actually have the object with the id ${productId} in the inventory`
                    })
                }
            }

            totalCost = type === 'ingredient' ? (qty * product.value) : product.value;
            if(player.gold < totalCost){
                return res.status(400).send({
                    error: `The player dont have gold to buy product`
                });
            }

            const inventoryCategory = type + "s";
            if(!player.inventory[inventoryCategory]){
                return res.status(400).send({
                    error: `Inventory category ${inventoryCategory} not exists`
                });
            }

            purchasedProducts.push({
                type,
                productId
            });   
        
            totalCost += product.value;
        }

        // Update Player
        player.gold -= totalCost;
        purchasedProducts.forEach(({type, productId}) => {
            const inventoryCategory = type + "s";
            player.inventory[inventoryCategory].push(productId);
            
        });


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