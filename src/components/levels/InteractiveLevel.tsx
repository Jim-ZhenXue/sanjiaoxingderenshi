import React, { useState } from 'react';
import { Point } from '../../types/game';

interface InteractiveLevelProps {
  data: {
    vertices: Point[];
  };
}

const InteractiveLevel: React.FC<InteractiveLevelProps> = ({ data }) => {
  const [vertices, setVertices] = useState(data.vertices);
  const [draggedVertex, setDraggedVertex] = useState<number | null>(null);

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
          ? { ...v, x: Math.max(0, Math.min(x, 300)), y: Math.max(0, Math.min(y, 300)) }
          : v
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedVertex(null);
  };

  return (
    <svg
      className="w-full h-[300px] border border-gray-200 rounded-lg"
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
  );
};

export default InteractiveLevel;