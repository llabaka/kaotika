import { Player } from '@/_common/interfaces/Player';
import Image from 'next/image';

interface PlayerStatsButtonsProps {
  player: Player;
}

const PlayerStatsButtons: React.FC<PlayerStatsButtonsProps> = ({ player }) => {
  return (
    <div className="flex flex-col justify-center items-center w-10/12 h-32">
      <div className="flex flex-col justify-center items-center space-y-2 w-[100%] h-40">
        {/* Level Div */}
        <div className="w-[75%] h-full flex relative items-center justify-center">
          <Image
            src="/images/shop/ManagePlayerButton.png"
            alt="Imagen 1"
            fill
            sizes="(max-width: 426px) 100vw"
          />
          <span className="flex z-10 text-orange-400 text-3xl w-full justify-center">
            <div className='mr-16'>LVL</div>
            <div className='text-5xl ml-4 absolute top-[-1px] right-[33%]'>{player.level}</div>
          </span>
        </div>
        {/* Gold Div */}
        <div className="w-[90%] h-[100%] flex relative items-center justify-center">
          <Image
            src="/images/shop/ManagePlayerButton.png"
            alt="Imagen 1"
            fill
            sizes="(max-width: 426px) 100vw"
          />
          <div
            className="flex items-center justify-center z-10 text-orange-400 text-5xl"
            data-testid={"PlayerGold"}
          >
            <div className='flex items-center'>
              <div className='mt-[-15px]'>{player.gold}</div>
            </div>

            <div className='flex w-[65px] h-[65px] items-center justify-center'>
              <div className='flex relative w-[60%] h-[60%]'>
                <Image
                  src="/images/shop/CoinsIcon.png"
                  alt="Gold"
                  fill
                  sizes="(max-width: 426px) 100vw"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerStatsButtons;