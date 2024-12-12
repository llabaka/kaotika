import React from 'react';

interface ProgressBarProps {
  value?: number; // Valor entre -100 y 100
}

const CardProgressBar = ({ value }: ProgressBarProps) => {
  const MAX_VALUE = 50;
  const MIN_VALUE = -50;

  // Cálculo de ancho positivo y negativo
  let positiveWidth = value! > 0 ? (value! / MAX_VALUE) * MAX_VALUE : 0;
  let negativeWidth = value! < 0 ? (Math.abs(value!) / MAX_VALUE) * MAX_VALUE : 0;

  if (positiveWidth > MAX_VALUE) {
    positiveWidth = MAX_VALUE;
  }

  if (negativeWidth < MIN_VALUE) {
    negativeWidth = MIN_VALUE;
  }

  return (
    <div className="relative w-full h-2 bg-gray-300 rounded overflow-hidden">
      {/* Parte negativa */}
      <div
        className="absolute h-full bg-red-500"
        style={{
          width: `${negativeWidth}%`,
          left: `${MAX_VALUE - negativeWidth}%`, // Ajusta desde el centro
        }}
      ></div>
      {/* Parte positiva */}
      <div
        className="absolute h-full bg-orange-400 left-1/2"
        style={{
          width: `${positiveWidth}%`,
        }}
      ></div>
    </div>
  )
};

export default CardProgressBar;
