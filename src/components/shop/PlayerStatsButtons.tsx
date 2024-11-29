import Image from 'next/image';

const PlayerStatsButtons = () => {
    return (

    <div className="flex flex-col justify-center items-center w-10/12 h-32">
        <div className="flex justify-around">
            {/* First Image */}	
            <div className="w-40 h-12 flex relative items-center justify-center">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-2xl">1230€</span>
            </div>
            {/* Second Image */}
            <div className="w-40 h-12 flex relative items-center justify-center">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-2xl">LVL 17</span>
            </div>
        </div>

            {/* Third Imagen Button */}
            <button className="w-60 h-16 flex relative items-center justify-center ">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">MANAGE PLAYER</span>
            </button>
    </div>
    );

};
export default PlayerStatsButtons;