export interface Shape {
  id: number;
  type: 'triangle' | 'irregular' | 'arc';
  points: [number, number][];
  arcParams?: {
    rx: number;
    ry: number;
    xAxisRotation: number;
    largeArcFlag: number;
    sweepFlag: number;
  };
}

export interface Point {
  x: number;
  y: number;
  id: number;
}

export interface Triangle {
  id: number;
  points: Point[];
  type?: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  type: 'identification' | 'construction' | 'interactive' | 'realWorld';
  data: any;
  correctAnswers?: number[];
}