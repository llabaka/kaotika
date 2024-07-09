import React, { Component } from 'react';
import { EnhancerPotion } from '@/_common/interfaces/EnhancerPotion';

interface Props {
  element: EnhancerPotion;
}

const EnhancerPotionTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='p-4 text-center'>
          <h1 className="text-3xl mb-4 text-darkSepia">{element.name}</h1>
          <p className="text-3xl mb-4">{element.description}</p>
          <h1 className="text-3xl mb-4 text-darkSepia">Turns</h1>
          <p className="text-3xl mb-4">{element.duration}</p>
          <h1 className="text-3xl mb-4 text-darkSepia">Modifiers</h1> 
          {element.modifiers.map(modifier => {
            return <p className="text-3xl mb-4 text-center">{modifier.attribute}: {modifier.value}</p>
          })}
          
        </div>
    )

}

export default EnhancerPotionTooltip