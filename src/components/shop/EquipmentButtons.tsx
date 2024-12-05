import { AllProducts } from '@/_common/interfaces/shop/AllProducts';
import { Product } from '@/_common/interfaces/shop/CardProps';
import Image from 'next/image';
import React, { useState } from 'react';

interface EquipmentButtonsInterface {
    allProducts: AllProducts;
	showingProducts: Product[];
	setShowingProducts: (loaded: Product[]) => void;
}

const EquipmentButtons:React.FC<EquipmentButtonsInterface> = ({allProducts, showingProducts, setShowingProducts}) => {
    
    const [activeButton, setActiveButton] = useState(0);

    const buttons = [
        { id: 0, label: 'WEAPONS' },
        { id: 1, label: 'ARMORS' },
        { id: 2, label: 'BOOTS' },
        { id: 3, label: 'HELMETS' },
        { id: 4, label: 'RINGS' },
        { id: 5, label: 'SHIELDS' }
    ];

    const handleButtonClick = (buttonId: number) => {
        setActiveButton((prev) => (prev === buttonId ? 0 : buttonId));

        switch (buttonId) {
            case 0:
                setShowingProducts(allProducts!.weapons);
                break;
            case 1:
                setShowingProducts(allProducts!.armors);
                break;
            case 2:
                setShowingProducts(allProducts!.boots);
                break;
            case 3:
                setShowingProducts(allProducts!.helmets);
                break;
            case 4:
                setShowingProducts(allProducts!.rings);
                break;
            case 5:
                setShowingProducts(allProducts!.shields);
                break;
            default:
                setShowingProducts([]); // En caso de que no haya selección válida
                break;
        }
    };

    return (
        <div className="flex-col justify-start items-center w-10/12 h-80 mt-1 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
        {buttons.map(({ id, label }) => (
            <button
                key={id}
                onClick={() => handleButtonClick(id)}
                className={`w-[98%] h-16 flex relative items-center justify-center mb-4 transform transition-transform ${activeButton !== id ? 'hover:scale-105' : ''}`}
            >
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt={label}
                    fill
                    sizes='(max-width: 426px) 100vw'
                    className={`transform transition ${activeButton === id ? 'scale-100' : 'scale-90'}`}
                />
                <span
                    className={`z-10 text-orange-400 transition-all ${
                        activeButton === id ? 'text-3xl text-orange-300' : 'text-2xl'
                    } hover:text-orange-200`}
                >
                    {label}
                </span>
            </button>
        ))}
        </div>
    );
};

export default EquipmentButtons;
