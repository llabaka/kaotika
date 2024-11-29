import Card from "./Card/Card"
import { CardProps } from "@/_common/interfaces/shop/CardProps";

const cardMock : CardProps = {
    minLevel: 12,
    image: '/images/equipment/armors/jacket_1.png',
    modifiers: {
        intelligence: 12,
        dexterity: 12,
        constitution: 20,
        insanity: 43,
        charisma: 23,
        strength: 34
    },
    name: 'cardMock',
    description: 'Description prubea de carta lkasndjoasbdiuasd',
    icon: '/images/icons/up.png',
    value: 340, 
    defense: 32
};

const CardItem = () => {
    return(
        <div className="flex w-[31.5%] h-full bg-transparent text-center items-center justify-center text-white hover:scale-105 transition">
            <Card {...cardMock}/>
        </div>
    )
}

export default CardItem;