import React, { Component } from 'react';
import { Armor } from '@/_common/interfaces/Armor';

interface Props {
  element: Armor;
}

const ArmorTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='w-64 p-4 text-medievalSepia'>
          <h1 className="text-3xl mb-4 text-center">{element.name}</h1>
          <p className="text-2xl mb-4">{element.description}</p>
          {element.modifiers.map(modifier => {
            return <p className="text-2xl mb-4 text-center">{modifier.attribute}: {modifier.value}</p>
          })}
        </div>
    )

}

export default ArmorTooltip