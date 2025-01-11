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
    <svg className="w-full h-[400px]">
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
      
      {/* Tree */}
      <g transform="translate(-400,0)">
        <rect x="465" y="300" width="10" height="50" fill="#8B4513" />
        <polygon 
          points="450,300 470,250 490,300" 
          fill="green" 
          stroke={selectedItems.includes(2) ? "red" : "none"} 
          strokeWidth={selectedItems.includes(2) ? 3 : 0} 
          onClick={() => onSelect(2)} 
        />
      </g>

      {/* Pond */}
      <ellipse cx="300" cy="350" rx="50" ry="20" fill="#1E90FF" />

      {/* House */}
      {/* House Walls */}
      <rect x="190" y="230" width="120" height="70" fill="#D2691E" />
      {/* House Roof */}
      <polygon 
        points="190,230 250,180 310,230" 
        fill="#8B0000" 
        stroke={selectedItems.includes(1) ? "red" : "none"} 
        strokeWidth={selectedItems.includes(1) ? 3 : 0} 
        onClick={() => onSelect(1)} 
      />
      {/* Window */}
      <rect x="215" y="250" width="20" height="20" fill="#ADD8E6" />

      {/* Bush */}
      <ellipse cx="400" cy="370" rx="20" ry="10" fill="darkgreen" />

    </svg>
  );
};

export default PlaygroundLevel;