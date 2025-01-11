import React from 'react';

export const CareerLink: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 mx-4 text-center">
        <h2 className="text-xl font-bold text-blue-500 mb-4">恭喜完成！</h2>
        <p className="text-gray-600 mb-4">
          你已经成功完成了所有关卡！
          <br />
          让我们看看你的最终得分...
        </p>
      </div>
    </div>
  );
};
