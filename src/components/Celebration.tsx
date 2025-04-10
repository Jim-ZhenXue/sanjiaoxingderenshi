import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationProps {
  onFinish: () => void;
  score: number;
}

export const Celebration: React.FC<CelebrationProps> = ({ onFinish, score }) => {
  useEffect(() => {
    const duration = 3 * 1000; // 3秒
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const runFirework = () => {
      const timeLeft = animationEnd - Date.now();
      
      // 创建多个烟花
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: randomInRange(0.2, 0.8), y: randomInRange(0.2, 0.5) },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
        startVelocity: 30,
        gravity: 0.5,
        scalar: 0.7,
        ticks: 100
      });

      // 创建闪光效果
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: randomInRange(0.3, 0.7), y: randomInRange(0.3, 0.6) },
        colors: ['#ffffff', '#f0f0f0'],
        startVelocity: 45,
        gravity: 0.7,
        scalar: 0.5,
        ticks: 50
      });

      if (timeLeft > 0) {
        setTimeout(runFirework, 300);  // 每300ms发射一次烟花
      }
    };

    // 启动多个烟花
    runFirework();
    
    // 添加星星效果
    const addStars = () => {
      confetti({
        particleCount: 10,
        spread: 180,
        origin: { x: Math.random(), y: Math.random() },
        colors: ['#FFD700', '#FFA500', '#ffffff'],
        gravity: 0.1,
        scalar: 0.3,
        ticks: 150
      });
    };

    const starInterval = setInterval(addStars, 500);

    // 3秒后自动跳转
    const timer = setTimeout(() => {
      onFinish();
    }, duration);

    return () => {
      clearInterval(starInterval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" style={{ transform: 'scale(2) translateY(-15%)', transformOrigin: 'center top' }}>
      <div className="w-full h-full absolute">
        <canvas id="celebration-canvas" className="w-full h-full"></canvas>
      </div>
      <div className="bg-white bg-opacity-90 p-8 rounded-xl text-center relative z-10 shadow-2xl">
        <h2 className="text-4xl font-bold mb-6 text-purple-600">🎉 恭喜通关！</h2>
        <p className="text-2xl mb-8">
          你的最终得分：<span className="font-bold text-green-600">{score}</span> 分
        </p>
      </div>
    </div>
  );
};
