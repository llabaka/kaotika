import React, { Component } from 'react';
import { Weapon } from '@/_common/interfaces/Weapon';

interface Props {
  element: Weapon;
}

const WeaponTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='p-4 text-center'>
          <h1 className="text-3xl mb-4 text-darkSepia">{element.name}</h1>
          <p className="text-3xl mb-4">{element.description}</p>
          <p className="text-3xl mb-4 text-darkSepia">Damage</p>
          <p className="text-3xl mb-4">{element.damage}</p>
          <p className="text-3xl mb-4 text-darkSepia">Base Percentage</p>
          <p className="text-3xl mb-4">{element.base_percentage}</p>
          <p className="text-3xl mb-4 text-darkSepia">Modifiers:</p>
          {element.modifiers.map((modifier, index) => {
            return <p key={index} className="text-3xl mb-4">{modifier.attribute}: {modifier.value}</p>
          })}
          
        </div>
    )

}

export default WeaponTooltip