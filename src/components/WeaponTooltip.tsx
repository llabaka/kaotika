import React, { Component } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import { Weapon } from '@/_common/interfaces/Weapon';

interface Props {
  element: Weapon;
}

const WeaponTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='p-4 text-center  bg-black'>
          <h1 className="text-3xl mb-2 text-darkSepia">{element.name}</h1>
          <p className="text-2xl mb-2 font-light">{element.description}</p>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-3xl mb-2 text-center text-darkSepia font-light">Damage</th>
                <th className="text-3xl mb-2 text-center text-darkSepia font-light">Base Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-2xl mb-2 text-center text-medievalGold">{element.damage}</td>
                <td className="text-2xl mb-2 text-center text-medievalGold">{element.base_percentage}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-3xl mb-2 text-darkSepia">Modifiers:</p>
          {element.modifiers.constitution ? <p className="text-2xl mb-2">Constitution: {element.modifiers.constitution}</p> : null}
          {element.modifiers.charisma ? <p className="text-2xl mb-2">Charisma: {element.modifiers.charisma}</p> : null}
          {element.modifiers.dexterity ? <p className="text-2xl mb-2">Dexterity: {element.modifiers.dexterity}</p> : null}
          {element.modifiers.insanity ? <p className="text-2xl mb-2">Insanity: {element.modifiers.insanity}</p> : null}
          {element.modifiers.intelligence ? <p className="text-2xl mb-2">Intelligence: {element.modifiers.intelligence}</p> : null}
          {element.modifiers.strength ? <p className="text-2xl mb-2">Strength: {element.modifiers.strength}</p> : null} 
          
        </div>
    )

}

export default WeaponTooltip