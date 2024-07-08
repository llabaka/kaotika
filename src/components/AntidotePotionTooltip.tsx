import React, { Component } from 'react';
import { AntidotePotion } from '@/_common/interfaces/AntidotePotion';

interface Props {
  element: AntidotePotion;
}

const AntidotePotionTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='w-64 p-4 text-medievalSepia'>
          <h1 className="text-3xl mb-4 text-center">{element.name}</h1>
          <p className="text-2xl mb-4">{element.description}</p>
          <p className="text-2xl mb-4 text-center">{element.recovery_effect.type}</p>       
          <p className="text-2xl mb-4 text-center">{element.recovery_effect.name}</p>       
          <p className="text-2xl mb-4 text-center">{element.recovery_effect.description}</p> 
          {element.recovery_effect.modifiers.map(modifier => {
            return <p className="text-2xl mb-4 text-center">{modifier.attribute}: {modifier.value}</p>  
          })}      
       
        </div>
    )

}

export default AntidotePotionTooltip