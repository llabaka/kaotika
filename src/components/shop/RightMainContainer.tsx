import Card from "./Card/Card";
import { CardProps } from "@/_common/interfaces/shop/CardProps";

import MainNavigator from "./MainNavigator";


const RightMainContainer = () => {
	const cardMock : CardProps = {
		minLevel: 12,
		image: '/images/equipment/armors/jacket_1.png',
		modifiers: {
			intelligence: 12,
			dexterity: 12,
			constitution: 20,
			insanity: 43,
			charisma: 23,
			strength: -34
		},
		name: 'cardMock',
		description: 'Description prubea de carta lkasndjoasbdiuasd',
		icon: '/images/icons/up.png',
		value: 340, 
		defense: 32
	};

	return (
        <div className="flex flex-col justify-start items-center w-9/12 bg-black/85 p-4 rounded-md mr-2">
			<MainNavigator/>
			<Card {...cardMock}/>
		</div>
	);
};

export default RightMainContainer;
