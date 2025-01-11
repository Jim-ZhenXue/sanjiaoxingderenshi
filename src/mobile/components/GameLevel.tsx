import React from 'react';
import { Level } from '../../types/level';
import IdentificationLevel from './levels/IdentificationLevel';

interface GameLevelProps {
  level: Level;
  selectedItems: number[];
  onSelect: (id: number) => void;
  isCorrect: boolean;
}

const GameLevel: React.FC<GameLevelProps> = ({
  level,
  selectedItems,
  onSelect,
  isCorrect,
}) => {
  const renderLevel = () => {
    switch (level.id) {
      case 1:
        return <IdentificationLevel data={level.data} onSelect={onSelect} selectedItems={selectedItems} />;
      default:
        return (
          <div className="relative w-full aspect-square bg-white rounded-lg shadow-md">
            {level.data.map((point) => (
              <button
                key={point.id}
                onClick={() => onSelect(point.id)}
                className={`absolute w-12 h-12 -translate-x-6 -translate-y-6 rounded-full 
                  ${selectedItems.includes(point.id) 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border-2 border-gray-300'
                  } ${isCorrect ? 'bg-green-500 border-green-500' : ''}`}
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                }}
              >
                {point.label}
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="w-full p-4 mb-20">
      <h2 className="text-xl font-bold mb-4 text-center">{level.title}</h2>
      <p className="text-gray-600 mb-6 text-center">{level.description}</p>
      {renderLevel()}
    </div>
  );
};

export default GameLevel;
