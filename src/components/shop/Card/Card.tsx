import Image from "next/image";
import { CardProps } from "@/_common/interfaces/shop/CardProps";
import CardProgessBar from "./CardProgressBar";

const Card = (props: CardProps) => {
    const CardImageRoute = '/images/shop/EquipmentCleanPNG.png';
    const GoldIcon = '/images/icons/gold.png';

    return(
            <div className="w-[26rem] relative h-[26rem] flex flex-row">
                <Image
                    src={CardImageRoute}
                    alt="MainNavigator"
                    layout="fill"
                    className="z-0"
                />
                {/* LEFT CONTAINER */}
                <div className="flex flex-col relative w-8/12">
                    {/* DIV LEVEL */}
                    <div className="z-10 relative flex flex-row p-2 justify-between">
                        <p className="text-white text-xl font-bold mt-3 ml-3">{props.minLevel}</p>
                        <div className="flex justify-around w-4/12 mt-5 ml-8">
                            <p className="text-white text-xl font-bold">{props.value}</p>
                            <Image src={GoldIcon} width={20} height={20} alt="gold icon" />
                        </div>
                        <Image
                            src={props.icon}
                            width={38}
                            height={28}
                            alt="Equipment icon"
                            className="rounded-full relative top-2 -left-2"
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
                <div className="z-10 relative flex flex-col p-2 w-3/12">
                    {/* Sección derecha */}
                    <p>Charisma :</p>
                    <p>{props.modifiers.charisma}</p>
                    <p>Constitution :</p>
                    <p>{props.modifiers.constitution}</p>
                    <p>Dexterity :</p>
                    <p>{props.modifiers.dexterity}</p>
                    <p>Insanity :</p>
                    <p>{props.modifiers.insanity}</p>
                    <p>Intelligence :</p>
                    <p>{props.modifiers.intelligence}</p>
                    <p>Strength : {props.modifiers.strength}</p>
                    <CardProgessBar value={props.modifiers.strength}/>
                    <p>Defense :  {props.defense}</p>
                    <CardProgessBar value={props.defense}/>
                </div>         
        </div>
    )
};

export default Card;
