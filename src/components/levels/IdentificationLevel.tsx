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
    let pathData;
    if (shape.type === 'triangle') {
      pathData = `M ${shape.points[0][0] + 10},${shape.points[0][1]} L ${shape.points[1][0] + 10},${shape.points[1][1]} L ${shape.points[2][0] + 10},${shape.points[2][1]} Z`;
    } else if (shape.type === 'arc' && shape.arcParams) {
      if (shape.points.length === 3) {
        // 三点圆弧形状（等腰三角形带圆弧底边）
        const [top, left, right] = shape.points;
        const { rx, ry, xAxisRotation, largeArcFlag, sweepFlag } = shape.arcParams;
        pathData = `M ${top[0] + 10},${top[1]} L ${left[0] + 10},${left[1]} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${right[0] + 10},${right[1]} L ${top[0] + 10},${top[1]}`;
      } else {
        // 普通双点圆弧
        const start = shape.points[0];
        const end = shape.points[1];
        const { rx, ry, xAxisRotation, largeArcFlag, sweepFlag } = shape.arcParams;
        pathData = `M ${start[0] + 10},${start[1]} L ${end[0] + 10},${end[1]} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${start[0] + 10} ${start[1]}`;
      }
    } else {
      pathData = `M ${shape.points.map(point => `${point[0] + 10},${point[1]}`).join(' L ')} Z`;
    }

    return (
      <svg width="120" height="125" viewBox="-10 -10 70 70" className="transform scale-75 sm:scale-100">
        <path
          d={pathData}
          fill={selectedItems.includes(shape.id) ? 'rgba(59, 130, 246, 0.2)' : 'none'}
          stroke={selectedItems.includes(shape.id) ? '#3B82F6' : '#9CA3AF'}
          strokeWidth={selectedItems.includes(shape.id) ? '0.75' : '0.25'}
          className={clsx(
            'transition-all duration-300',
            selectedItems.includes(shape.id) && 'scale-105'
          )}
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 sm:gap-0 pt-20">
      {data.map((shape) => (
        <button
          key={shape.id}
          onClick={() => onSelect(shape.id)}
          className={clsx(
            'p-4 transition-all duration-300',
            'hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500',
            'touch-manipulation transform',
            selectedItems.includes(shape.id)
              ? 'bg-blue-900 shadow-lg scale-105'
              : ''
          )}
        >
          {renderShape(shape)}
        </button>
      ))}
    </div>
  );
};

export default IdentificationLevel;