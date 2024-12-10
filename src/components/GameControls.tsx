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
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 items-center">
        <div className="text-lg bg-purple-100 px-4 py-2 rounded-lg">
          关卡: <span className="font-bold">{level}</span>
        </div>
        <div className="text-lg bg-green-100 px-4 py-2 rounded-lg">
          得分: <span className="font-bold">{score}</span>
        </div>
      </div>

      {isCorrect && (
        <button
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors animate-fast-pulse"
          onClick={onNextLevel}
        >
          下一关 →
        </button>
      )}
    </div>
  );
}; 