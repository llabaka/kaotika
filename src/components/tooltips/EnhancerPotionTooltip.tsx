import React, { Component } from 'react';
import { EnhancerPotion } from '@/_common/interfaces/EnhancerPotion';

interface Props {
  element: EnhancerPotion;
}

const EnhancerPotionTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='p-4 text-center'>
          <h1 className="text-3xl mb-4 text-darkSepia">{element.name}</h1>
          <p className="text-2xl mb-4">{element.description}</p>
          <h1 className="text-3xl mb-4 text-darkSepia">Turns</h1>
          <p className="text-2xl mb-4">{element.duration}</p>
          <p className="text-3xl mb-2 text-darkSepia">Modifiers</p> 
          {element.modifiers.constitution ? <p className="text-2xl mb-2">Constitution: {element.modifiers.constitution}</p> : null}
          {element.modifiers.charisma ? <p className="text-2xl mb-2">Charisma: {element.modifiers.charisma}</p> : null}
          {element.modifiers.dexterity ? <p className="text-2xl mb-2">Dexterity: {element.modifiers.dexterity}</p> : null}
          {element.modifiers.insanity ? <p className="text-2xl mb-2">Insanity: {element.modifiers.insanity}</p> : null}
          {element.modifiers.intelligence ? <p className="text-2xl mb-2">Intelligence: {element.modifiers.intelligence}</p> : null}
          {element.modifiers.strength ? <p className="text-2xl mb-2">Strength: {element.modifiers.strength}</p> : null}          
        </div>
    )
}

export default EnhancerPotionTooltip