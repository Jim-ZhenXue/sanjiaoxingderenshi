import React, { useState, useCallback } from 'react';
import { levels } from './data/levels';
import GameLevel from './components/GameLevel';
import { ArrowRight } from 'lucide-react';

function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const handleSelect = useCallback((id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const handleSubmit = useCallback(() => {
    const level = levels[currentLevel];
    if (level.correctAnswers) {
      const correctCount = level.correctAnswers.filter(answer => 
        selectedItems.includes(answer)
      ).length;
      const incorrectCount = selectedItems.length - correctCount;
      const newScore = Math.max(0, correctCount - incorrectCount);
      setScore(prev => prev + newScore);
    }
  }, [currentLevel, selectedItems]);

  const handleNextLevel = useCallback(() => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setSelectedItems([]);
    }
  }, [currentLevel]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">三角形探索之旅</h1>
        
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }}
            />
          </div>
        </div>

        <GameLevel
          level={levels[currentLevel]}
          onSelect={handleSelect}
          selectedItems={selectedItems}
        />

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            提交答案
          </button>
          
          <div className="text-xl font-semibold">
            得分: {score}
          </div>

          <button
            onClick={handleNextLevel}
            disabled={currentLevel === levels.length - 1}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            下一关
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;