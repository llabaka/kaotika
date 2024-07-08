import React, { Component } from 'react';
import { Weapon } from '@/_common/interfaces/Weapon';

interface Props {
  element: Weapon;
}

const WeaponTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='w-64 p-4 text-medievalSepia'>
          <h1 className="text-3xl mb-4 text-center">{element.name}</h1>
          <p className="text-2xl mb-4">{element.description}</p>
          <p className="text-2xl mb-4">Damage: {element.damage}</p>
          <p className="text-2xl mb-4">Base Percent: {element.base_percentage}</p>
          <p className="text-2xl mb-4">Modifiers:</p>
          {element.modifiers.map(modifier => {
            return <p className="text-2xl mb-4 text-center">{modifier.attribute}: {modifier.value}</p>
          })}
          
        </div>
    )

}

export default WeaponTooltip