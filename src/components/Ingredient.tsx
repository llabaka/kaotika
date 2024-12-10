import React, { ReactNode } from 'react';
import { Ingredient } from '@/_common/interfaces/Ingredient';
import { Tooltip } from '@nextui-org/react';

type TooltipPlacement =
  | "top"
  | "bottom"
  | "right"
  | "left"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

interface Props {
  id: string;
  tooltip: ReactNode;
  type: string[];
  element: Ingredient;
  className: string | undefined;
  tooltipClassName: string;
  width: string;
  border: string;
  position: TooltipPlacement;
}

const IngredientComponent: React.FC<Props> = ({ id, tooltip, tooltipClassName, className, element, position}) => {
  
  return (
    <Tooltip className={tooltipClassName} placement={position} size='sm' showArrow={true} content={tooltip} closeDelay={0}>
    <img id={id} src={element.image} alt="Ingredient" className={className} />
    </Tooltip>
  );
}

export default IngredientComponent;




