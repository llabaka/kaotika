import Image from 'next/image';

const EquipmentButtons = () => {
    return (
        <div className="flex-col justify-start items-center w-10/12 h-80 to overflow-y-scroll mt-1">
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