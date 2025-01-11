import React from 'react';
import clsx from 'clsx';
import { Shape } from '../../../types/game';

interface IdentificationLevelProps {
  data: Shape[];
  onSelect: (id: number) => void;
  selectedItems: number[];
}

const IdentificationLevel: React.FC<IdentificationLevelProps> = ({ data, onSelect, selectedItems }) => {
  const renderShape = (shape: Shape) => {
    let pathData;
    if (shape.type === 'triangle') {
      pathData = `M ${shape.points[0][0]},${shape.points[0][1]} L ${shape.points[1][0]},${shape.points[1][1]} L ${shape.points[2][0]},${shape.points[2][1]} Z`;
    } else if (shape.type === 'arc' && shape.arcParams) {
      if (shape.points.length === 3) {
        // 三点圆弧形状（等腰三角形带圆弧底边）
        const [top, left, right] = shape.points;
        const { rx, ry, xAxisRotation, largeArcFlag, sweepFlag } = shape.arcParams;
        pathData = `M ${top[0]},${top[1]} L ${left[0]},${left[1]} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${right[0]},${right[1]} L ${top[0]},${top[1]}`;
      } else {
        // 普通双点圆弧
        const start = shape.points[0];
        const end = shape.points[1];
        const { rx, ry, xAxisRotation, largeArcFlag, sweepFlag } = shape.arcParams;
        pathData = `M ${start[0]},${start[1]} L ${end[0]},${end[1]} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${start[0]} ${start[1]}`;
      }
    } else {
      pathData = `M ${shape.points.map(point => `${point[0]},${point[1]}`).join(' L ')} Z`;
    }

    return (
      <svg width="120" height="125" viewBox="0 0 50 50" className="transform scale-100">
        <path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="transition-all duration-200"
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((shape) => (
        <button
          key={shape.id}
          onClick={() => onSelect(shape.id)}
          className={clsx(
            'p-6 transition-all duration-200',
            'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500',
            selectedItems.includes(shape.id)
              ? 'bg-blue-50'
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
