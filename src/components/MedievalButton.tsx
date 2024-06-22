import React from 'react';

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const MedievalButton: React.FC<Props> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`border-orange-300 border-1 text-4xl mb-8 px-6 py-3 bg-medieval-gold text-medieval-dark rounded-lg shadow-lg hover:bg-medieval-green ${className}`}
    >
      {children}
    </button>
  );
}

export default MedievalButton;