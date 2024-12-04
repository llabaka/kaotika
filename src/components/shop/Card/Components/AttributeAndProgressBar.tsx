import CardProgressBar from "./CardProgressBar";
import { RenderObject } from "@/_common/interfaces/shop/RenderObject";

const AttributeAndProgressBar = ({name, value} : RenderObject) => {
    return (
        <div className="h-12 w-[90%] px-1">
        <p className="text-[20px] text-justify">{name}: {value}</p>
            <CardProgressBar value={value}/>
        </div>
    )
}

export default AttributeAndProgressBar;