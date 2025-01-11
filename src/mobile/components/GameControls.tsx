import React from 'react';

interface GameControlsProps {
  onSubmit: () => void;
  currentLevel: number;
  totalLevels: number;
  score: number;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onSubmit,
  currentLevel,
  totalLevels,
  score,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-between w-full text-sm text-gray-600">
          <span>关卡: {currentLevel + 1}/{totalLevels}</span>
          <span>得分: {score}</span>
        </div>
        <button
          onClick={onSubmit}
          className="w-full py-4 px-6 bg-blue-500 text-white rounded-full text-lg font-semibold active:bg-blue-600 transform active:scale-95 transition-transform"
        >
          提交答案
        </button>
      </div>
    </div>
  );
};
