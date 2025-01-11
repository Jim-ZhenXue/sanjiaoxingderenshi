import React, { useEffect, useState } from 'react';

interface CareerLinkProps {
  score: number;
  onRestart: () => void;
  onFinish: () => void;
}

export const CareerLink: React.FC<CareerLinkProps> = ({ score, onRestart, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onFinish();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl text-center relative z-10 shadow-2xl max-w-2xl w-full mx-4">
        <h2 className="text-3xl font-bold mb-6 text-purple-600">🎯 生涯探索</h2>
        
        <div className="mb-8">
          <p className="text-xl mb-4">
            你在三角形探索之旅获得了 <span className="font-bold text-green-600">{score}</span> 分
          </p>
          <p className="text-lg text-gray-600 mb-6">
            通过这次游戏，你展现了以下能力：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-2">👁️ 观察能力</h3>
              <p className="text-gray-600">能够识别不同形状的三角形，展现出优秀的空间感知能力</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-700 mb-2">🧩 逻辑思维</h3>
              <p className="text-gray-600">通过构建和探索三角形，展示了良好的逻辑推理能力</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-700 mb-2">🎨 创造力</h3>
              <p className="text-gray-600">在探索三角形变化时，表现出创新思维和想象力</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-700 mb-2">🔍 分析能力</h3>
              <p className="text-gray-600">能够分析现实生活中的三角形，具备实践应用能力</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">🎓 相关职业推荐</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <p className="font-bold text-blue-600">建筑师</p>
              <p className="text-sm text-gray-600">空间设计与几何应用</p>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-bold text-green-600">工程师</p>
              <p className="text-sm text-gray-600">结构分析与设计</p>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-bold text-purple-600">数学教师</p>
              <p className="text-sm text-gray-600">几何知识传授</p>
            </div>
          </div>
        </div>

        <div className="text-gray-500 animate-pulse">
           {timeLeft}秒
        </div>
      </div>
    </div>
  );
};
