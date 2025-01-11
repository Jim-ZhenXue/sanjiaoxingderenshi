export interface Point {
  id: number;
  x: number;
  y: number;
  label: string;
}

export interface Level {
  title: string;
  description: string;
  data: Point[];
  correctAnswers: number[];
}
