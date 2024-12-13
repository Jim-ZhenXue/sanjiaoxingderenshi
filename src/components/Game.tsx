import React, { useState, useCallback, useEffect } from 'react';
import { levels } from '../data/levels';
import { GameControls } from './GameControls';
import GameLevel from './GameLevel';
import { Celebration } from './Celebration';
import { CareerLink } from './CareerLink';

export const Game: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCareerLink, setShowCareerLink] = useState(false);

  const level = levels[currentLevel];

  // 检查三点是否在一条直线上
  const arePointsCollinear = useCallback((points: { x: number; y: number }[]) => {
    if (points.length !== 3) return false;
    
    const [p1, p2, p3] = points;
    
    // 使用斜率法检查三点是否共线
    // (y2-y1)/(x2-x1) = (y3-y1)/(x3-x1)
    // 为避免除以零，我们转换公式为：
    // (y2-y1)(x3-x1) = (y3-y1)(x2-x1)
    const area = p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y);
    
    // 如果面积接近0，则三点共线
    return Math.abs(area) < 1;
  }, []);

  // 检查答案是否正确
  const checkAnswer = useCallback(() => {
    // 如果是第二关（构建三角形）
    if (currentLevel === 1 && selectedItems.length === 3) {
      // 获取选中点的坐标
      const selectedPoints = selectedItems.map(id => 
        level.data.find(p => p.id === id)
      ).filter((p): p is { id: number; x: number; y: number } => p !== undefined);

      // 检查是否三点共线
      if (arePointsCollinear(selectedPoints)) {
        return false;
      }
      return true;
    }

    if (!level.correctAnswers) return false;
    
    // 检查是否所有正确答案都被选中
    const allCorrectSelected = level.correctAnswers.every(
      answer => selectedItems.includes(answer)
    );
    
    // 检查是否没有多选或少选
    const noExtraSelected = selectedItems.length === level.correctAnswers.length;
    
    return allCorrectSelected && noExtraSelected;
  }, [level.correctAnswers, selectedItems, currentLevel, level.data, arePointsCollinear]);

  // 当选择改变时检查答案
  useEffect(() => {
    setIsCorrect(checkAnswer());
  }, [selectedItems, checkAnswer]);

  // 处理选择图形
  const handleSelect = useCallback((id: number) => {
    setSelectedItems(prev => {
      // 如果是第二关（构建三角形）
      if (currentLevel === 1) {
        // 如果点已经被选中，移除它
        if (prev.includes(id)) {
          return prev.filter(i => i !== id);
        }
        // 如果还没选满3个点，添加新点
        if (prev.length < 3) {
          return [...prev, id];
        }
        // 如果已经选了3个点，不做任何改变
        return prev;
      }
      
      // 其他关卡的原有逻辑
      return prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
    });
  }, [currentLevel]);

  // 处理进入下一关
  const handleNextLevel = useCallback(() => {
    if (currentLevel === 2) {  // 如果是"探索三角形"关卡
      setCurrentLevel(3);  // 直接进入"生活中的三角形"关卡
      setSelectedItems([]);
      setIsCorrect(false);
      return;
    }
    
    if (isCorrect) {
      // 增加得分（每个正确答案得一分）
      const pointsEarned = level.correctAnswers?.length || 0;
      setScore(prev => prev + pointsEarned);
      
      if (currentLevel < levels.length - 1) {
        // 进入下一关
        setCurrentLevel(prev => prev + 1);
        // 重置选择状态
        setSelectedItems([]);
        // 重置正确状态
        setIsCorrect(false);
      } else {
        // 如果是最后一关，显示庆祝页面
        setShowCelebration(true);
      }
    }
  }, [currentLevel, isCorrect, level.correctAnswers?.length]);

  // 处理游戏重新开始
  const handleGameRestart = useCallback(() => {
    setCurrentLevel(0);
    setSelectedItems([]);
    setScore(0);
    setIsCorrect(false);
    setShowCelebration(false);
    setShowCareerLink(false);
  }, []);

  // 当关卡改变时，重置状态
  useEffect(() => {
    setSelectedItems([]);
    setIsCorrect(false);
  }, [currentLevel]);

  return (
    <>
      {showCareerLink ? (
        <CareerLink onRestart={handleGameRestart} score={score} />
      ) : showCelebration ? (
        <Celebration 
          onFinish={() => setShowCareerLink(true)} 
          score={score} 
        />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-5">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-5">
            <h1 className="text-2xl font-bold text-center mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 animate-gradient tech-font">
                三角形
              </span>
              <span className="text-purple-600">探索之旅</span>
            </h1>
            
            {/* 关卡内容 */}
            <div className="mb-8">
              <div className="bg-[#FFFFE0] p-4 rounded-lg mb-4">
                <h1 className="text-xl font-bold mb-4">{level.title}</h1>
                <p className="text-base">{level.description}</p>
              </div>
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
      )}
    </>
  );
};