import React from 'react';
import { Point } from '../../types/game';

interface ConstructionLevelProps {
  data: Point[];
  onSelect: (id: number) => void;
  selectedItems: number[];
}

const ConstructionLevel: React.FC<ConstructionLevelProps> = ({ data, onSelect, selectedItems }) => {
  return (
    <svg className="w-full h-[400px]">
      {selectedItems.length >= 2 && (
        <polygon
          points={selectedItems
            .map(id => {
              const point = data.find(p => p.id === id);
              return point ? `${point.x},${point.y}` : '';
            })
            .join(' ')}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3B82F6"
          strokeWidth="2"
        />
      )}
      {data.map((point) => (
        <g key={point.id}>
          {/* 透明的大触控区域 */}
          <circle
            cx={point.x}
            cy={point.y}
            r="18"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => onSelect(point.id)}
          />
          {/* 可见的小圆点 */}
          <circle
            cx={point.x}
            cy={point.y}
            r="6"
            fill={selectedItems.includes(point.id) ? '#3B82F6' : '#fff'}
            stroke="#3B82F6"
            strokeWidth="2"
            pointerEvents="none"
          />
        </g>
      ))}
    </svg>
  );
};

export default ConstructionLevel;