import React, { Component } from 'react';
import { AntidotePotion } from '@/_common/interfaces/AntidotePotion';

interface Props {
  element: AntidotePotion;
}

const AntidotePotionTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='p-4 text-center'>
          <h1 className="text-3xl mb-2 text-darkSepia">{element.name}</h1>
          <p className="text-2xl mb-2 font-light">{element.description}</p>
          <p className="text-3xl mb-2 text-darkSepia">Recovery {element.recovery_effect.type}</p>         
          <p className="text-2xl mb-2 ">{element.recovery_effect.name}</p>       
        </div>
    )
}

export default AntidotePotionTooltip