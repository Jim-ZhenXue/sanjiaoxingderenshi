import React from 'react';

export const Celebration: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 text-center transform scale-110 animate-bounce">
        <h2 className="text-2xl font-bold text-green-500 mb-2">太棒了！</h2>
        <p className="text-gray-600">答对了！</p>
      </div>
    </div>
  );
};
