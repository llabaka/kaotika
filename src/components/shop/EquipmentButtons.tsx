import Image from 'next/image';
import { useState } from 'react';

const EquipmentButtons = () => {
    
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
    };

    return (
        <div className="flex-col justify-start items-center w-10/12 h-80 mt-1 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
        {buttons.map(({ id, label }) => (
            <button
            key={id}
            onClick={() => handleButtonClick(id)}
            className="w-full h-16 flex relative items-center justify-center mb-4"
            >
            <Image
                src="/images/shop/ManagePlayerButton.png"
                alt={label}
                layout="fill"
                className={`transform transition ${activeButton === id ? 'scale-100' : 'scale-90'}`}
            />
            <span
                className={`z-10 text-orange-400 hover:text-orange-200 transition-all ${
                activeButton === id ? 'text-3xl text-orange-200' : 'text-2xl'
                }`}
            >
                {label}
            </span>
            </button>
        ))}
        </div>
    );
};

export default EquipmentButtons;
