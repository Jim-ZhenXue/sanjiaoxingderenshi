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
        points: [[12, 20], [4, 8], [20, 8]]
      },
      { 
        id: 2, 
        type: 'irregular',
        points: [[5, 5], [12, 2], [18, 8], [15, 15], [8, 12], [6, 8]]
      },
      { 
        id: 3, 
        type: 'triangle',
        // 直角三角形 (90-45-45度)
        points: [[4, 4], [4, 20], [20, 4]]
      },
      { 
        id: 4, 
        type: 'irregular',
        points: [[4, 8], [10, 4], [16, 6], [18, 12], [12, 16], [6, 14], [5, 10]]
      },
      { 
        id: 5, 
        type: 'triangle',
        // 钝角三角形 (140-20-20度)
        points: [[4, 4], [20, 4], [0, 16]]
      },
      { 
        id: 6, 
        type: 'irregular',
        points: [[8, 5], [14, 3], [19, 8], [17, 14], [12, 18], [5, 12], [7, 8]]
      },
      { 
        id: 7, 
        type: 'irregular',
        points: [[3, 12], [8, 4], [14, 3], [18, 8], [16, 14], [10, 16], [4, 14]]
      },
      { 
        id: 8, 
        type: 'irregular',
        points: [[6, 6], [12, 4], [18, 7], [20, 13], [15, 18], [8, 15], [5, 10], [7, 8]]
      }
    ],
    correctAnswers: [1, 3, 5]
  },
  {
    id: 2,
    title: "构建三角形",
    description: "选择三个点来构建一个三角形",
    type: "construction",
    data: [
      { id: 1, x: 30, y: 50 },
      { id: 2, x: 170, y: 50 },
      { id: 3, x: 240, y: 50 },
      { id: 4, x: 150, y: 210 }
    ],
    correctAnswers: [1, 2, 4]
  },
  {
    id: 3,
    title: "探索三角形",
    description: "拖动顶点来改变三角形的形状",
    type: "interactive",
    data: {
      vertices: [
        { id: 1, x: 100, y: 50 },
        { id: 2, x: 50, y: 150 },
        { id: 3, x: 150, y: 150 }
      ]
    }
  },
  {
    id: 4,
    title: "生活中的三角形",
    description: "在操场场景中找出所有的三角形",
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
          type: "slide",
          points: [
            { x: 50, y: 250 },
            { x: 150, y: 100 },
            { x: 250, y: 250 }
          ]
        },
        {
          id: 2,
          type: "swingSet",
          points: [
            { x: 300, y: 200 },
            { x: 350, y: 100 },
            { x: 400, y: 200 }
          ]
        },
        {
          id: 3,
          type: "sandbox",
          points: [
            { x: 100, y: 300 },
            { x: 200, y: 250 },
            { x: 300, y: 300 }
          ]
        },
        {
          id: 4,
          type: "flag",
          points: [
            { x: 380, y: 50 },
            { x: 400, y: 20 },
            { x: 420, y: 50 }
          ]
        },
        {
          id: 5,
          type: "tree",
          points: [
            { x: 450, y: 150 },
            { x: 470, y: 100 },
            { x: 490, y: 150 }
          ]
        }
      ]
    },
    correctAnswers: [1, 2, 3, 4, 5]
  }
];