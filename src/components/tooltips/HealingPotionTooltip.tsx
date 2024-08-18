import React, { Component } from 'react';
import { HealingPotion } from '@/_common/interfaces/HealingPotion';

interface Props {
  element: HealingPotion;
}

const HealingPotionTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='p-4 text-center'>
          <h1 className="text-3xl mb-4 text-darkSepia">{element.name}</h1>
          <p className="text-2xl mb-4">{element.description}</p>
          <p className="text-3xl mb-2 text-darkSepia">Modifiers</p> 
          {element.modifiers.hit_points ? <p className="text-2xl mb-2">Hit Points: {element.modifiers.hit_points}</p> : null}
          {element.modifiers.constitution ? <p className="text-2xl mb-2">Constitution: {element.modifiers.constitution.toString()}</p> : null}
          {element.modifiers.charisma ? <p className="text-2xl mb-2">Charisma: {element.modifiers.charisma.toString()}</p> : null}
          {element.modifiers.dexterity ? <p className="text-2xl mb-2">Dexterity: {element.modifiers.dexterity.toString()}</p> : null}
          {element.modifiers.insanity ? <p className="text-2xl mb-2">Insanity: {element.modifiers.insanity.toString()}</p> : null}
          {element.modifiers.intelligence ? <p className="text-2xl mb-2">Intelligence: {element.modifiers.intelligence.toString()}</p> : null}
          {element.modifiers.strength ? <p className="text-2xl mb-2">Strength: {element.modifiers.strength.toString()}</p> : null}
        </div>
    )

}

export default HealingPotionTooltip