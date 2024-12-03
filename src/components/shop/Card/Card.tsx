import Image from "next/image";
import CardRigthContainer from "./Components/CardRigthContainer";
import { CardProps } from "@/_common/interfaces/shop/CardProps";
import { useState } from "react";

interface DefenseRender {
    name: string;
    value : number;
}

const Card = (props: CardProps) => {
    // State for render Attributes based on type
    const [defense, setDefense] = useState<DefenseRender | null>(null);
    const [weaponDamage, setWeaponDamage] = useState<string | null>(null);
    
    const CardImageRoute = '/images/shop/EquipmentCleanPNG.png';
    const GoldIcon = '/images/icons/gold.png';

    let icon = '';
    if(props.type === 'armor'){
        
        icon = '/images/icons/up.png'    
    }

    if('defense' in props){
        const renderDefense : DefenseRender = {
            name: 'Defense',
            value: props.defense
        }
        // setDefense(renderDefense);
    }

    if('base_percentage' in props){
        const weaponDamage = `${props.die_faces}D${props.die_num} + ${props.die_modifier}`;
        // setWeaponDamage(weaponDamage);
    }





    return(
            <div className="w-[25rem] relative h-[23rem] flex flex-row">
                <Image
                    src={CardImageRoute}
                    alt="MainNavigator"
                    fill
                    sizes='(max-width: 435px) 100vw'
                    className="z-0"
                />
                {/* LEFT CONTAINER */}
                <div className="flex flex-col relative w-8/12">
                    {/* DIV LEVEL */}
                    <div className="z-10 relative flex flex-row p-2 justify-between">
                        <p className="text-white text-xl font-bold mt-3 ml-3">{props.min_lvl}</p>
                        <div className="flex justify-around w-4/12 mt-5 ml-8">
                            <p className="text-white text-xl font-bold">{props.value}</p>
                            <Image src={GoldIcon} width={20} height={20} alt="gold icon" />
                        </div>

                        <Image
                            src={icon}
                            width={128}
                            height={28}
                            alt="Equipment icon"
                            className="rounded-full relative top-1 -left-0.5 w-[18%]"
                        />
                    </div>

                    {/* IMAGE DIV */}
                    <div className="h-[16rem] flex items-center justify-center">
                        <Image src={props.image} width={140} height={140} alt="Equipment Image" />
                    </div>
                    {/* NAME, DESCRIPTION BUTTONS DIV */}
                    <div className="h-1/6 text-black text-lg font-bold flex content-center justify-center -mt-2">
                        <p className="mt-3">{props.name}</p>
                    </div>
                    <div className="h-1/6 text-lg font-bold flex content-center justify-center mt-2">
                        <p>{props.description}</p>
                    </div>
                    <div className="h-1/6 flex justify-around">
                        <button className="text-white text-xl ml-3 w-2/6 rounded-full flex items-center justify-center">Add Basket</button>
                        <button className="text-white text-xl mr-3 w-2/6 rounded-full flex items-center justify-center">Buy</button>
                    </div>
                </div>
                {/* CARD RIGHT CONTAINER */}
                <CardRigthContainer attributes={props.modifiers} />
        </div>
    )
};

export default Card;