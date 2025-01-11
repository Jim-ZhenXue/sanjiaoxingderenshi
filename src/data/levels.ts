// src/data/levels.ts
import { Level } from '../types/game';

export const levels: Level[] = [
  {
    id: 1,
    title: "认识三角形",
    description: "在下面的图形中选出所有的三角形",
    type: "identification",
    data: [
      { 
        id: 1, 
        type: 'triangle',
        // 锐角三角形 (约60-60-60度)
        points: [[24, 40], [8, 16], [40, 7]]
      },
      { 
        id: 2, 
        type: 'irregular',
        points: [[20, 10], [30, 4], [36, 50], [16, 29]]
      },
      { 
        id: 3, 
        type: 'arc',
        points: [
          [25, 50],  // 底部点 (原来是顶点)
          [10, 8],   // 左顶点 (原来是左底点)
          [40, 8]    // 右顶点 (原来是右底点)
        ],
        arcParams: {
          rx: 20,
          ry: 12,
          xAxisRotation: 0,
          largeArcFlag: 1,
          sweepFlag: 0  // Changed from 1 to 0 to flip the arc direction
        }
      },
      { 
        id: 4, 
        type: 'arc',
        points: [[0, 15], [40, 15]],
        arcParams: {
          rx: 15,
          ry: 15,
          xAxisRotation: 0,
          largeArcFlag: 1,
          sweepFlag: 1
        }
      },
      { 
        id: 5, 
        type: 'irregular',
        points: [[12, 12], [24, 8], [40, 46], [10, 20], [14, 16]]
      },
      { 
        id: 6, 
        type: 'irregular',
        // 五角星的十个顶点，按顺序接
        points: [
          [25, 8],   // 顶部点
          [20, 18],  // 内部点
          [10, 18],  // 左外点
          [18, 25],  // 内部点
          [14, 35],  // 左下外点
          [25, 28],  // 内部点
          [36, 35],  // 右下外点
          [32, 25],  // 内部点
          [40, 18],  // 右外点
          [30, 18]   // 内部点
        ]
      },
      { 
        id: 7, 
        type: 'arc',
        points: [
          [25, 8],  // 顶点
          [10, 30], // 左底点
          [40, 30]  // 右底点
        ],
        arcParams: {
          rx: 20,
          ry: 15,
          xAxisRotation: 0,
          largeArcFlag: 0,
          sweepFlag: 0
        }
      },
      { 
        id: 8, 
        type: 'triangle',
        // 钝角三角形 (140-20-20度)
        points: [[8, 8], [40, 8], [0, 32]]
      }
    ],
    correctAnswers: [1, 8]
  },
  // 其他关卡数据
  {
    id: 2,
    title: "构建三角形",
    description: "选择三个点来构建一个三角形",
    type: "construction",
    data: [
      { id: 1, x: 50, y: 70 },
      { id: 2, x: 400, y: 70 },
      { id: 3, x: 150, y: 300 },
      { id: 4, x: 600, y: 70 }
    ],
    correctAnswers: [1, 2, 3]
  },
  {
    id: 3,
    title: "探索三角形",
    description: "拖动顶点来改变三角形的形状",
    type: "interactive",
    data: {
      vertices: [
        { id: 1, x: 100, y: 50 },
        { id: 2, x: 250, y: 300 },
        { id: 3, x: 600, y: 300 }
      ]
    }
  },
  {
    id: 4,
    title: "生活中的三角形",
    description: "找出图中所有的三角形",
    type: "realWorld",
    data: {
      elements: {
        sky: { height: 200, color: "#87CEEB" },
        ground: { height: 200, color: "#90EE90" },
        sun: { x: 450, y: 50, radius: 30, color: "#FFD700" }
      },
      triangles: [
        {
          id: 1,
          type: "roof",
          points: [
            { x: 190, y: 230 },
            { x: 250, y: 180 },
            { x: 310, y: 230 }
          ]
        },
        {
          id: 2,
          type: "tree",
          points: [
            { x: 450, y: 300 },
            { x: 470, y: 250 },
            { x: 490, y: 300 }
          ]
        }
      ]
    },
    correctAnswers: [1, 2]
  }
];
