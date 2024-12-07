import React from 'react';
import { Triangle } from '../../types/game';

interface PlaygroundLevelProps {
  data: {
    triangles: Triangle[];
    elements: {
      sky: { height: number; color: string };
      ground: { height: number; color: string };
      sun: { x: number; y: number; radius: number; color: string };
    };
  };
  onSelect: (id: number) => void;
  selectedItems: number[];
}

const PlaygroundLevel: React.FC<PlaygroundLevelProps> = ({ data, onSelect, selectedItems }) => {
  return (
    <svg className="w-full h-[400px] border border-gray-200 rounded-lg">
      {/* Background */}
      <rect x="0" y="0" width="100%" height={data.elements.sky.height} fill={data.elements.sky.color} />
      <rect x="0" y={data.elements.sky.height} width="100%" height={data.elements.ground.height} fill={data.elements.ground.color} />
      
      {/* Sun */}
      <circle 
        cx={data.elements.sun.x} 
        cy={data.elements.sun.y} 
        r={data.elements.sun.radius} 
        fill={data.elements.sun.color} 
      />
      
      {/* Clouds */}
      <g transform="translate(100,60)">
        <ellipse cx="0" cy="0" rx="30" ry="20" fill="white" />
        <ellipse cx="30" cy="0" rx="30" ry="20" fill="white" />
        <ellipse cx="15" cy="-10" rx="20" ry="15" fill="white" />
      </g>

      {/* Playground Elements */}
      {/* Slide */}
      <polygon points="50,250 150,100 250,250" fill="#8B4513" stroke="black" />
      <rect x="140" y="100" width="20" height="150" fill="#A0522D" />
      
      {/* Swing Set */}
      <polygon points="300,200 350,100 400,200" fill="none" stroke="black" strokeWidth="3" />
      <line x1="325" y1="150" x2="375" y2="150" stroke="black" strokeWidth="2" />
      <line x1="325" y1="150" x2="325" y2="180" stroke="black" strokeWidth="2" />
      <line x1="375" y1="150" x2="375" y2="180" stroke="black" strokeWidth="2" />
      
      {/* Sandbox */}
      <polygon points="100,300 200,250 300,300" fill="#F4A460" stroke="black" />
      
      {/* Flag */}
      <line x1="400" y1="20" x2="400" y2="100" stroke="black" strokeWidth="2" />
      <polygon points="380,50 400,20 420,50" fill="red" />
      
      {/* Tree */}
      <rect x="465" y="150" width="10" height="50" fill="#8B4513" />
      <polygon points="450,150 470,100 490,150" fill="green" />

      {/* Selectable Triangles */}
      {data.triangles.map((triangle) => (
        <polygon
          key={triangle.id}
          points={triangle.points.map(p => `${p.x},${p.y}`).join(' ')}
          fill={selectedItems.includes(triangle.id) ? 'rgba(59, 130, 246, 0.3)' : 'transparent'}
          stroke={selectedItems.includes(triangle.id) ? '#3B82F6' : 'transparent'}
          strokeWidth="2"
          className="cursor-pointer hover:stroke-blue-300 hover:stroke-2 transition-colors"
          onClick={() => onSelect(triangle.id)}
        />
      ))}
    </svg>
  );
};

export default PlaygroundLevel;