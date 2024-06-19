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
      className={`text-4xl font-bold mb-8 px-6 py-3 bg-medieval-gold text-medieval-dark rounded-lg shadow-lg hover:bg-medieval-green focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
}

export default MedievalButton;