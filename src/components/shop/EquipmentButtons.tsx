import Image from 'next/image';

const EquipmentButtons = () => {
    return (
        <div className="flex flex-col justify-center items-center w-10/12 rounded-m h-96">
            <button className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">WEAPON</span>
            </button>
            <button className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-2xl ">ARMORS</span>
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
        </div>
    )
}

export default EquipmentButtons;