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
        <div key={element._id} className='p-4 text-center'>
          <h1 className="text-3xl mb-2 text-darkSepia">{element.name}</h1>
          <p className="text-2xl mb-2">{element.description}</p>
          <p className="text-2xl mb-2">Damage</p>
          <p className="text-2xl mb-2">{element.damage}</p>
          <p className="text-2xl mb-2">Base Percentage</p>
          <p className="text-2xl mb-2">{element.base_percentage}</p>
          <Table 
          className='' 
            aria-label="Kaotika Students">
            <TableHeader className=' bg-black'>
              <TableColumn className="text-2xl mb-2 text-center   bg-black text-darkSepia">Damage</TableColumn>
              <TableColumn className="text-2xl mb-2 text-center  bg-black text-darkSepia">Base Percentage</TableColumn>
            </TableHeader>
            <TableBody> 
              <TableRow>
                <TableCell className="text-xl mb-2 text-center">{element.damage}</TableCell>
                <TableCell className="text-xl mb-2 text-center">{element.base_percentage}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-3xl mb-2 text-darkSepia">Modifiers:</p>
          {element.modifiers.map((modifier, index) => {
            return <p key={index} className="text-2xl mb-2">{modifier.attribute}: {modifier.value}</p>
          })}
          
        </div>
    )

}

export default WeaponTooltip