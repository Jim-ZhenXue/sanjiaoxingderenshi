import React from 'react';

interface GameControlsProps {
  score: number;
  level: number;
  isCorrect: boolean;
  onNextLevel: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  score,
  level,
  isCorrect,
  onNextLevel,
}) => {
  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col items-center gap-2 sm:gap-4">
        <div className="flex gap-3 sm:gap-6 items-center">
          <div className="text-base sm:text-lg bg-purple-900 text-purple-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
            关卡: <span className="font-bold">{level}</span>
          </div>
          <div className="text-base sm:text-lg bg-green-900 text-green-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
            得分: <span className="font-bold">{score}</span>
          </div>
        </div>
      </div>

      {isCorrect && (
        <button
          className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 px-4 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-sm sm:text-base transition-colors animate-fast-pulse"
          onClick={onNextLevel}
        >
          下一关 →
        </button>
      )}
    </div>
  );
}; 