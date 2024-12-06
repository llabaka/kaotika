import React, { useEffect, useState } from 'react';

interface EffectsContainerProps {
    effects: string[];
}

const EffectsContainer: React.FC<EffectsContainerProps> = ({ effects }) => {
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
    } , [effects]);

    return (
        <div className="z-10 relative flex flex-col p-2 w-[34%] px-2 ">
            <div className="w-[90%]">
                <p className="text-[26px] font-bold text-center">Effects:</p>
                {words.map((word, index) => (
                    <p key={index} className="text-[24px] break-words">
                        {word}
                    </p>
                ))}
            </div>

        </div>
    );
};

export default EffectsContainer;
