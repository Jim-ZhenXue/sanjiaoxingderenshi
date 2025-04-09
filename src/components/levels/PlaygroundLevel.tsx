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
        <ellipse cx="0" cy="0" rx="45" ry="30" fill="white" />
        <ellipse cx="45" cy="0" rx="45" ry="30" fill="white" />
        <ellipse cx="22" cy="-15" rx="30" ry="22" fill="white" />
      </g>
      
      {/* Tree */}
      <g transform="translate(0,0)">
        <rect x="100" y="250" width="15" height="75" fill="#8B4513" />
        <polygon 
          points="80,250 107,180 135,250" 
          fill="green" 
          stroke={selectedItems.includes(2) ? "red" : "none"} 
          strokeWidth={selectedItems.includes(2) ? 6 : 0} 
          onClick={() => onSelect(2)} 
        />
      </g>

      {/* Pond */}
      <ellipse cx="250" cy="300" rx="75" ry="30" fill="#1E90FF" />

      {/* House */}
      {/* House Walls */}
      <rect x="180" y="200" width="180" height="105" fill="#D2691E" />
      {/* House Roof */}
      <polygon 
        points="180,200 270,130 360,200" 
        fill="#8B0000" 
        stroke={selectedItems.includes(1) ? "red" : "none"} 
        strokeWidth={selectedItems.includes(1) ? 3 : 0} 
        onClick={() => onSelect(1)} 
      />
      {/* Window */}
      <rect x="215" y="230" width="30" height="30" fill="#ADD8E6" />

      {/* Bush */}
      <ellipse cx="350" cy="320" rx="30" ry="15" fill="darkgreen" />

    </svg>
  );
};

export default PlaygroundLevel;