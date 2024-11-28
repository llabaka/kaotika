import Image from "next/image";
import { CardProps } from "@/_common/interfaces/shop/CardProps";

const Card = (props  : CardProps ) => {
    const CardImageRoute = '/images/shop/EquipmentCleanPNG.png';
    const GoldIcon = '/images/icons/gold.png'

    return (
        <div
            className="w-3/12 bg-contain bg-no-repeat h-2/6 bg-white"
            style={{
                backgroundImage: `url(${CardImageRoute})`,
            }}
        >
            
            <div>
                <p>{props.minLevel}</p>
                <div>  
                    <p>{props.value}</p>
                    <Image src={GoldIcon} width={20} height={20} alt="gold icon"/>
                </div>
                <Image src={props.icon} width={20} height={20} alt="Equipment icon"/>
            </div>
        </div>
    );
}

export default Card;
