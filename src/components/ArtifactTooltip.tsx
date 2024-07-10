import React, { Component } from 'react';
import { Artifact } from '@/_common/interfaces/Artifact';

interface Props {
  element: Artifact;
}

const ArtifactTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='text-center p-4'>
          <h1 className="text-3xl mb-2 text-darkSepia">{element.name}</h1>
          <p className="text-2xl mb-2">{element.description}</p>
          <h1 className="text-3xl mb-2 text-darkSepia">Charisma modifier</h1>
          {element.modifiers_charisma.map((modifier, index) => {
            return <p key={`char-${index}`} className="text-2xl mb-2">{modifier.attribute} + Charisma * {modifier.value}</p>
          })}
          <h1 className="text-3xl mb-2 text-darkSepia">Modifiers</h1>
          {element.modifiers.map((modifier, index) => {
            return <p key={`mod-${index}`} className="text-2xl mb-2">{modifier.attribute}: {modifier.value}</p>
          })}
          
        </div>
    )

}

export default ArtifactTooltip