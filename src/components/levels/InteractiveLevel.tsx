import React, { useState, useEffect } from 'react';
import { Point } from '../../types/game';

interface InteractiveLevelProps {
  data: {
    vertices: Point[];
  };
  onNextLevel?: () => void;  
}

const InteractiveLevel: React.FC<InteractiveLevelProps> = ({ data, onNextLevel }) => {
  const [vertices, setVertices] = useState(data.vertices);
  const [draggedVertex, setDraggedVertex] = useState<number | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [operationCount, setOperationCount] = useState(0);

  useEffect(() => {
    if (operationCount >= 3) {
      setShowNextButton(true);
    }
  }, [operationCount]);

  const handleMouseDown = (id: number) => {
    setDraggedVertex(id);
  };

  const handleTouchStart = (id: number, e: React.TouchEvent) => {
    e.preventDefault();
    setDraggedVertex(id);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (draggedVertex === null) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setVertices(prev =>
      prev.map(v =>
        v.id === draggedVertex
          ? { ...v, x: Math.max(0, Math.min(x, 850)), y: Math.max(0, Math.min(y, 850)) }
          : v
      )
    );
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (draggedVertex === null) return;
    e.preventDefault();

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setVertices(prev =>
      prev.map(v =>
        v.id === draggedVertex
          ? { ...v, x: Math.max(0, Math.min(x, 850)), y: Math.max(0, Math.min(y, 850)) }
          : v
      )
    );
  };

  const handleMouseUp = () => {
    if (draggedVertex !== null) {
      setOperationCount(prev => prev + 1);
    }
    setDraggedVertex(null);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (draggedVertex !== null) {
      setOperationCount(prev => prev + 1);
    }
    setDraggedVertex(null);
  };

  return (
    <div className="relative w-full">
      <svg
        className="w-full h-[400px]"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onMouseLeave={handleMouseUp}
      >
        <polygon
          points={vertices.map(v => `${v.x},${v.y}`).join(' ')}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        {vertices.map((vertex) => (
          <g key={vertex.id}>
            {/* 透明的大触控区域 */}
            <circle
              cx={vertex.x}
              cy={vertex.y}
              r="18"
              fill="transparent"
              className="cursor-move"
              style={{ touchAction: 'none' }}
              onMouseDown={() => handleMouseDown(vertex.id)}
              onTouchStart={(e) => handleTouchStart(vertex.id, e)}
            />
            {/* 可见的小圆点 */}
            <circle
              cx={vertex.x}
              cy={vertex.y}
              r="6"
              fill="#fff"
              stroke="#3B82F6"
              strokeWidth="2"
              pointerEvents="none"
            />
          </g>
        ))}
      </svg>
      {showNextButton && onNextLevel && (
        <button
          onClick={onNextLevel}
          className="absolute bottom-4 right-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors animate-fast-pulse translate-y-10"
        >
          下一关 →
        </button>
      )}
    </div>
  );
};

export default InteractiveLevel;