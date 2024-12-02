import { Player } from '@/_common/interfaces/Player';
import Image from 'next/image';

interface PlayerStatsButtonsProps {
    player: Player;
}

const PlayerStatsButtons:React.FC<PlayerStatsButtonsProps> = ({ player }) => {
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
                    <div className="flex items-center justify-center z-10 text-orange-400 text-3xl">
                        {player.gold}
                            <Image
                            src="/images/CoinsIcon.png"
                            alt="Gold"
                            width={24}
                            height={24}
                            className="ml-2"
                        />
                    </div>
            </div>
            {/* Second Image */}
            <div className="w-40 h-12 flex relative items-center justify-center">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                />
                <span className="z-10 text-orange-400 text-3xl">{player.level} LVL</span>
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