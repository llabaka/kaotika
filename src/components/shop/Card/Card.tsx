import Image from "next/image";
import CardRigthContainer from "./Components/CardRigthContainer";
import { CardProp, Product } from "@/_common/interfaces/shop/Product";
import { useState, useEffect } from "react";
import { RenderObject } from "@/_common/interfaces/shop/RenderObject";
import EffectsContainer from "./Components/effectsContainer";
import CardLeftContainer from "./Components/CardLeftContainer";
import { Player } from "@/_common/interfaces/Player";

interface ProductInterface {
    props: Product,
    onClickBuy: () => void;
    onClickAddToCart: () => void;
    player: Player
}

const Card = ({props, onClickBuy, onClickAddToCart, player} : ProductInterface) => {
    // State for render Attributes based on type
    const [extraAtribute, setExtraAtribute] = useState<RenderObject | null>(null);
    const [weaponDamage, setWeaponDamage] = useState<string | null>(null);
    const [baseDamage, setBaseDamage] = useState<number | null>(null);
    const [effects, setEffects] = useState<string[]>([]);
    const [isEquipment, setIsEquipment] = useState<boolean>(false);


    const CardImageRoute = '/images/shop/EquipmentCleanPNG.png';

    let icon = '/images/icons/up.png';
    if(props.type === 'armor'){   
        icon = '/images/icons/up.png';
    }
    
    const renderDefense = 'defense' in props 
        ? { name: 'Defense', value: props.defense }
        : null;

    const weaponDamageRender = 'base_percentage' in props 
        ? `${props.die_faces}D${props.die_num} + ${props.die_modifier}`
        : null;

    const baseDamageRender = 'base_percentage' in props 
        ? props.base_percentage
        : null;

    useEffect(() => {
        setExtraAtribute(renderDefense);
        setWeaponDamage(weaponDamageRender);
        setBaseDamage(baseDamageRender!);

        switch(props.type){
            case "armor":
            case "helmet":
            case "boot":
            case "artifact":
            case "ring":
            case "shield":
                setIsEquipment(true);
                break;
    
            case "weapon":
                setIsEquipment(true);
                break;
    
            case "ingredient":
                setIsEquipment(false);
                setEffects(props.effects!);
                break;
        }
    }, [props]);


    return(
            <div className="w-[100%] relative h-[23rem] flex flex-row">
                <Image
                    src={CardImageRoute}
                    alt="MainNavigator"
                    fill
                    sizes='(max-width: 435px) 100vw'
                    className="z-0"
                    style={{
                        filter: player.gold < props.value || player.level < props.min_lvl! ? 'grayscale(100%) brightness(0.5)' : '',
                    }}
                />
                {/* LEFT CONTAINER */}
                <CardLeftContainer min_lvl={props.min_lvl!} value={props.value} image={props.image!} name={props.name!} description={props.description!} _id={props._id!} onClickBuy={onClickBuy} onClickAddToCart={onClickAddToCart} player={player}/>

                {/* CARD RIGHT CONTAINER */}                
                { props.modifiers !== undefined ? ( 
                    <CardRigthContainer attributes={props.modifiers} extra_attribute={extraAtribute} weaponDie={weaponDamage} baseDamage={baseDamage}/>
                ) : null }
                { !isEquipment ? (
                    <EffectsContainer effects={effects}/> 
                ): null
                }
                
            </div>
    )
};

export default Card;