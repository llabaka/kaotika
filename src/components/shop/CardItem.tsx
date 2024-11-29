import Card from "./Card/Card"
import { CardProps } from "@/_common/interfaces/shop/CardProps";

interface CardItemProps {
    card: CardProps;
  }

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

const cards=[Card(cardMock), Card(cardMock), Card(cardMock)]

const CardItem: React.FC<CardItemProps> = ({ card }) => {
    return(
        <div className="flex w-[31.5%] bg-blue-500 text-center items-center justify-center text-white hover:scale-105 transition">
            <Card {...card} />
        </div>
    )
}

export default CardItem;