import { Modifier } from "@/_common/interfaces/Modifier";
import { RenderObject } from "@/_common/interfaces/shop/RenderObject";
import AttributeAndProgressBar from "./AttributeAndProgressBar";

interface CardRigthContainerProps {
    attributes: Modifier,
    extra_attribute: number
}

const CardRigthContainer = ({attributes, extra_attribute} : CardRigthContainerProps) => {
    const renderArray : RenderObject[] = [{
        name: 'Charisma',
        value : attributes.charisma
    }, {
        name : 'Constitution',
        value: attributes.constitution
    },{
        name: 'Dexterity',
        value: attributes.dexterity
    }, {
        name: 'Insanity',
        value: attributes.insanity
    }, {
        name: 'Intelligence',
        value: attributes.intelligence
    }, {
        name: 'Strength',
        value: attributes.strength
    }];

    return (
        <div className="z-10 relative flex flex-col p-2 w-3/12">
        {/* Sección derecha */}
        {renderArray.map(attribute => (
            <AttributeAndProgressBar value={attribute.value} name={attribute.name}/>
        ))}
    </div> 
    )
}

export default CardRigthContainer