import React from 'react';
import clsx from 'clsx';
import { Shape } from '../../types/game';

interface IdentificationLevelProps {
  data: Shape[];
  onSelect: (id: number) => void;
  selectedItems: number[];
}

const IdentificationLevel: React.FC<IdentificationLevelProps> = ({ data, onSelect, selectedItems }) => {
  const renderShape = (shape: Shape) => {
    const pathData = shape.type === 'triangle'
      ? `M ${shape.points[0][0]},${shape.points[0][1]} L ${shape.points[1][0]},${shape.points[1][1]} L ${shape.points[2][0]},${shape.points[2][1]} Z`
      : `M ${shape.points.map(point => `${point[0]},${point[1]}`).join(' L ')} Z`;

    return (
      <svg width="64" height="64" viewBox="0 0 24 24" className="transform scale-90">
        <path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          className="transition-all duration-200"
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {data.map((shape) => (
        <button
          key={shape.id}
          onClick={() => onSelect(shape.id)}
          className={clsx(
            'p-8 border-2 rounded-lg transition-all duration-200',
            'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500',
            selectedItems.includes(shape.id)
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200'
          )}
        >
          {renderShape(shape)}
        </button>
      ))}
    </div>
  );
};

export default IdentificationLevel;