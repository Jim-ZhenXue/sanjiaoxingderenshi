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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNextButton(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = (id: number) => {
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

  const handleMouseUp = () => {
    setDraggedVertex(null);
  };

  return (
    <div className="flex flex-col items-center">
      <svg
        className="w-full h-[300px]"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <polygon
          points={vertices.map(v => `${v.x},${v.y}`).join(' ')}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        {vertices.map((vertex) => (
          <circle
            key={vertex.id}
            cx={vertex.x}
            cy={vertex.y}
            r="6"
            fill="#fff"
            stroke="#3B82F6"
            strokeWidth="2"
            className="cursor-move"
            onMouseDown={() => handleMouseDown(vertex.id)}
          />
        ))}
      </svg>
      {showNextButton && onNextLevel && (
        <button
          className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors animate-fast-pulse"
          onClick={onNextLevel}
        >
          下一关 →
        </button>
      )}
    </div>
  );
};

export default InteractiveLevel;