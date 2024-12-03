import CardProgressBar from "./CardProgressBar";
import { RenderObject } from "@/_common/interfaces/shop/RenderObject";

const AttributeAndProgressBar = ({name, value} : RenderObject) => {
    return (
        <div className="h-12">
        <p className="text-base text-justify">{name}: {value}</p>
            <CardProgressBar value={value}/>
        </div>
    )
}

export default AttributeAndProgressBar;