import React from 'react';
import { Ring } from '@/_common/interfaces/Ring';

interface Props {
  element: Ring;
}

const RingTooltip: React.FC<Props> = ({ element }): React.ReactNode => {

    return (
        <div key={element._id} className='p-4 text-center'>
          <h1 className="text-3xl mb-2 text-darkSepia">{element.name}</h1>
          <p className="text-2xl mb-2">{element.description}</p>
          <h1 className="text-3xl mb-2 text-darkSepia">Modifiers</h1>
          {element.modifiers.constitution ? <p className="text-2xl mb-2">Constitution: {element.modifiers.constitution}</p> : null}
          {element.modifiers.charisma ? <p className="text-2xl mb-2">Charisma: {element.modifiers.charisma}</p> : null}
          {element.modifiers.dexterity ? <p className="text-2xl mb-2">Dexterity: {element.modifiers.dexterity}</p> : null}
          {element.modifiers.insanity ? <p className="text-2xl mb-2">Insanity: {element.modifiers.insanity}</p> : null}
          {element.modifiers.intelligence ? <p className="text-2xl mb-2">Intelligence: {element.modifiers.intelligence}</p> : null}
          {element.modifiers.strength ? <p className="text-2xl mb-2">Strength: {element.modifiers.strength}</p> : null}         
        </div>
    )

}

export default RingTooltip;