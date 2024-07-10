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
          {element.modifiers.map((modifier, index) => {
            return <p key={index} className="text-2xl mb-2 font-light">{modifier.attribute}: {modifier.value}</p>
          })}
          
        </div>
    )

}

export default WeaponTooltip