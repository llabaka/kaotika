import Image from 'next/image';

const EquipmentButtons = () => {
    return (
        <div className="flex-col justify-start items-center w-10/12 h-80 mt-1 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
            <button className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">WEAPONS</span>
            </button>
            <button className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">ARMORS</span>
            </button>
            <button className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">BOOTS</span>
            </button>
            <button className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">HELMETS</span>
            </button>
            <button className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">RINGS</span>
            </button>
            <button className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">SHIELDS</span>
            </button>
        </div>
    );
};

export default EquipmentButtons;