import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

interface Props {
  id: string;
  type: string[];
  src: string;
  className: string | undefined;
  width: string;
  border: string;
}

const Draggable: React.FC<Props> = ({ id, type, src, className, width, border }) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
    data: {
      supports: type,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    width,
    border
  };

  return (
    <img id={id} src={src} alt="Inventory" className={className} ref={setNodeRef} style={style} {...listeners} {...attributes} />
  );
}

export default Draggable;




