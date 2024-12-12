import React, { SetStateAction, useEffect, useState } from 'react';

interface EffectsContainerProps {
  effects: string[];
  qtyCard: number;
  setQtyCard: React.Dispatch<SetStateAction<number>>;
}

const EffectsContainer: React.FC<EffectsContainerProps> = ({ effects, qtyCard, setQtyCard }) => {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    effects.map(effect => {
      const changedWords: string[] = effect.split('_');
      const updatedWords: string[] = [];

      for (let i = 0; i < changedWords.length; i++) {
        const word = changedWords[i];
        if (word === 'hit' && i + 1 < changedWords.length) {

          const concatenated = `${word}${changedWords[++i]}`;
          updatedWords.push(concatenated.charAt(0).toUpperCase() + concatenated.slice(1));
        } else {

          updatedWords.push(word.charAt(0).toUpperCase() + word.slice(1));
        }
      }
      setWords([...updatedWords]);
    });
  }, [effects]);

  const increaseQty = () => {
    setQtyCard(prevQtyCard => prevQtyCard += 1);
  }

  const decreaseQty = () => {
    if (qtyCard > 0) {
      setQtyCard(prevQtyCard => prevQtyCard -= 1);
    } 
  }

  return (
    <div className="z-10 relative flex flex-col p-2 w-[34%] px-2">
      <div className="w-[90%]">
        <p className="text-[26px] font-bold text-center">Effects:</p>
        {words.map((word, index) => (
          <p key={index} className="text-[24px] break-words">
            {word}
          </p>
        ))}
      </div>
      <div className='h-[70%]'></div>
      <div className='w-90% flex justify-around -mt-3 items-center'>
        <button
          className="w-6 h-6 bg-orange-300 text-white text-4xl rounded-full flex items-center justify-center hover:bg-orange-600 transition"
          onClick={decreaseQty}
        >
          <div className="mb-4">-</div>
        </button>
        <div className='text-2xl'> Qty: {qtyCard}</div>
        <button
          className="w-6 h-6 bg-orange-300 text-white text-4xl rounded-full flex items-center justify-center hover:bg-orange-600 transition"
          onClick={increaseQty}
        >
          <div className="mb-3">+</div>
        </button>
      </div>
    </div>
  );
};

export default EffectsContainer;
