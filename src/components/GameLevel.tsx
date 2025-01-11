import React from 'react';
import { Level } from '../types/game';
import IdentificationLevel from './levels/IdentificationLevel';
import ConstructionLevel from './levels/ConstructionLevel';
import InteractiveLevel from './levels/InteractiveLevel';
import PlaygroundLevel from './levels/PlaygroundLevel';

interface GameLevelProps {
  level: Level;
  onSelect: (id: number) => void;
  onNextLevel: () => void;
  selectedItems: number[];
}

const GameLevel: React.FC<GameLevelProps> = ({ level, onSelect, onNextLevel, selectedItems }) => {
  const renderLevel = () => {
    switch (level.type) {
      case 'identification':
        return <IdentificationLevel data={level.data} onSelect={onSelect} selectedItems={selectedItems} />;
      case 'construction':
        return <ConstructionLevel data={level.data} onSelect={onSelect} selectedItems={selectedItems} />;
      case 'interactive':
        return <InteractiveLevel data={level.data} onNextLevel={onNextLevel} />;
      case 'realWorld':
        return <PlaygroundLevel data={level.data} onSelect={onSelect} selectedItems={selectedItems} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderLevel()}
    </div>
  );
};

export default GameLevel;