import { Player } from '@/_common/interfaces/Player';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
                    fill
                    sizes='(max-width: 426px) 100vw'
                />
                    <div className="flex items-center justify-center z-10 text-orange-400 text-3xl" data-testid={"PlayerGold"}>
                        {player.gold}
                            <Image
                            src="/images/shop/CoinsIcon.png"
                            alt="Gold"
                            width={24}
                            height={24}
                            className="ml-2"
                            style={{height: 'auto', width:'auto'}}
                        />
                    </div>
            </div>
            {/* Second Image */}
            <div className="w-40 h-12 flex relative items-center justify-center">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    fill
                    sizes='(max-width: 426px) 100vw'
                />
                <span className="z-10 text-orange-400 text-3xl">{player.level} LVL</span>
            </div>
        </div>
            
    </div>
    );

};
export default PlayerStatsButtons;