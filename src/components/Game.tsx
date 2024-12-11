import React, { useState, useCallback, useEffect } from 'react';
import { levels } from '../data/levels';
import { GameControls } from './GameControls';
import GameLevel from './GameLevel';

export const Game: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const level = levels[currentLevel];

  // 检查答案是否正确
  const checkAnswer = useCallback(() => {
    if (!level.correctAnswers) return false;
    
    // 检查是否所有正确答案都被选中
    const allCorrectSelected = level.correctAnswers.every(
      answer => selectedItems.includes(answer)
    );
    
    // 检查是否没有多选或少选
    const noExtraSelected = selectedItems.length === level.correctAnswers.length;
    
    return allCorrectSelected && noExtraSelected;
  }, [level.correctAnswers, selectedItems]);

  // 当选择改变时检查答案
  useEffect(() => {
    setIsCorrect(checkAnswer());
  }, [selectedItems, checkAnswer]);

  // 处理选择图形
  const handleSelect = useCallback((id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  // 处理进入下一关
  const handleNextLevel = useCallback(() => {
    if (currentLevel === 2) {  // 如果是"探索三角形"关卡
      setCurrentLevel(3);  // 直接进入"生活中的三角形"关卡
      setSelectedItems([]);
      setIsCorrect(false);
      return;
    }
    
    if (isCorrect && currentLevel < levels.length - 1) {
      // 增加得分（每个正确答案得一分）
      const pointsEarned = level.correctAnswers?.length || 0;
      setScore(prev => prev + pointsEarned);
      
      // 进入下一关
      setCurrentLevel(prev => prev + 1);
      // 重置选择状态
      setSelectedItems([]);
      // 重置正确状态
      setIsCorrect(false);
    }
  }, [currentLevel, isCorrect, level.correctAnswers?.length]);

  // 当关卡改变时，重置状态
  useEffect(() => {
    setSelectedItems([]);
    setIsCorrect(false);
  }, [currentLevel]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">三角形探索之旅</h1>
        
        {/* 进度条 */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 关卡内容 */}
        <div className="mb-8">
          <GameLevel
            level={level}
            onSelect={handleSelect}
            selectedItems={selectedItems}
            onNextLevel={handleNextLevel}
          />
        </div>

        {/* 控制面板 */}
        <GameControls
          score={score}
          level={currentLevel + 1}
          isCorrect={isCorrect}
          onNextLevel={handleNextLevel}
        />
      </div>
    </div>
  );
}; 