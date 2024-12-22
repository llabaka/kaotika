import { RenderObject } from "@/_common/interfaces/shop/RenderObject";
import AttributeAndProgressBar from "./AttributeAndProgressBar";
import { CardRightContainerInterface } from "@/_common/interfaces/shop/CardInterfaces";

const CardRightContainer: React.FC<CardRightContainerInterface> = ({ attributes, extra_attribute, weaponDie, baseDamage }) => {

  const renderArray: RenderObject[] = [{
    name: 'Charisma',
    value: attributes!.charisma
  }, {
    name: 'Constitution',
    value: attributes!.constitution
  }, {
    name: 'Dexterity',
    value: attributes!.dexterity
  }, {
    name: 'Insanity',
    value: attributes!.insanity
  }, {
    name: 'Intelligence',
    value: attributes!.intelligence
  }, {
    name: 'Strength',
    value: attributes!.strength
  }];

  return (
    <div className="z-10 relative flex flex-col justify-center p-2 w-[34%] px-2">
      {/* Sección derecha */}
      {renderArray.map((attribute, index) => (
        attribute.value !== 0 ?
          <AttributeAndProgressBar key={index} value={attribute.value} name={attribute.name} /> : null
      ))}
      {extra_attribute !== null ? (
        <AttributeAndProgressBar value={extra_attribute.value} name={extra_attribute.name} />
      )
        : null}
      {weaponDie !== null ? (
        <div className="w-[100%]">
          <p className="text-lg text-justify">Base Damage : {baseDamage}</p>
          <p className="text-lg text-justify">Die : {weaponDie}</p>
        </div>
      ) : null}
    </div>
  )
}

export default CardRightContainer