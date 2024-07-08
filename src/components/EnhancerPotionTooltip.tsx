import React, { Component } from 'react';
import { EnhancerPotion } from '@/_common/EnhancerPotion';

interface Props {
  element: EnhancerPotion;
}

const EnhancerPotionTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='w-128 p-4 text-medievalSepia'>
          <h1 className="text-3xl mb-4 text-center">{element.name}</h1>
          <p className="text-2xl mb-4">{element.description}</p>
          <p className="text-2xl mb-4">{element.type}</p>
          <p className="text-2xl mb-4">{element.duration}</p>
          {element.modifiers.map(modifier => {
            return <p className="text-2xl mb-4 text-center">{modifier.attribute}: {modifier.value}</p>
          })}
          
        </div>
    )

}

export default EnhancerPotionTooltip