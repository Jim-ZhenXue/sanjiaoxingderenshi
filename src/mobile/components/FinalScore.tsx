import React from 'react';

interface FinalScoreProps {
  score: number;
  onRestart: () => void;
}

export const FinalScore: React.FC<FinalScoreProps> = ({ score, onRestart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold text-blue-500 mb-6">游戏结束！</h2>
        <p className="text-xl mb-8">
          你的最终得分: <span className="font-bold text-2xl">{score}</span>
        </p>
        <button
          onClick={onRestart}
          className="bg-blue-500 text-white py-4 px-8 rounded-full text-lg font-semibold active:bg-blue-600 transform active:scale-95 transition-transform"
        >
          再玩一次
        </button>
      </div>
    </div>
  );
};
