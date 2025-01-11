import React, { useState, useCallback, useEffect } from 'react';
import { levels } from '../../data/levels';
import { GameControls } from './GameControls';
import GameLevel from './GameLevel';
import { Celebration } from './Celebration';
import { CareerLink } from './CareerLink';
import { FinalScore } from './FinalScore';

export const MobileGame: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCareerLink, setShowCareerLink] = useState(false);
  const [showFinalScore, setShowFinalScore] = useState(false);

  const level = levels[currentLevel];

  // 检查三点是否在一条直线上
  const arePointsCollinear = useCallback((points: { x: number; y: number }[]) => {
    if (points.length !== 3) return false;
    
    const [p1, p2, p3] = points;
    const area = p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y);
    return Math.abs(area) < 1;
  }, []);

  // 检查答案是否正确
  const checkAnswer = useCallback(() => {
    if (currentLevel === 1 && selectedItems.length === 3) {
      const selectedPoints = selectedItems.map(id => 
        level.data.find(p => p.id === id)
      ).filter((p): p is { id: number; x: number; y: number } => p !== undefined);

      if (arePointsCollinear(selectedPoints)) {
        return false;
      }
      return true;
    }

    return level.correctAnswers.every(answer => selectedItems.includes(answer));
  }, [currentLevel, level.correctAnswers, selectedItems]);

  // 处理选择
  const handleSelect = useCallback((id: number) => {
    setSelectedItems(prev => {
      const index = prev.indexOf(id);
      if (index === -1) {
        // 如果是第二关，限制选择3个点
        if (currentLevel === 1 && prev.length >= 3) {
          return prev;
        }
        return [...prev, id];
      } else {
        return prev.filter(item => item !== id);
      }
    });
  }, [currentLevel]);

  // 处理提交
  const handleSubmit = useCallback(() => {
    const correct = checkAnswer();
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      setShowCelebration(true);
      
      setTimeout(() => {
        setShowCelebration(false);
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(prev => prev + 1);
          setSelectedItems([]);
          setIsCorrect(false);
        } else {
          setShowCareerLink(true);
          setTimeout(() => {
            setShowCareerLink(false);
            setShowFinalScore(true);
          }, 3000);
        }
      }, 2000);
    }
  }, [checkAnswer, currentLevel]);

  // 重新开始游戏
  const restartGame = useCallback(() => {
    setCurrentLevel(0);
    setSelectedItems([]);
    setScore(0);
    setIsCorrect(false);
    setShowCelebration(false);
    setShowCareerLink(false);
    setShowFinalScore(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!showFinalScore ? (
        <>
          <GameLevel
            level={level}
            selectedItems={selectedItems}
            onSelect={handleSelect}
            isCorrect={isCorrect}
          />
          <GameControls
            onSubmit={handleSubmit}
            currentLevel={currentLevel}
            totalLevels={levels.length}
            score={score}
          />
          {showCelebration && <Celebration />}
          {showCareerLink && <CareerLink />}
        </>
      ) : (
        <FinalScore score={score} onRestart={restartGame} />
      )}
    </div>
  );
};
