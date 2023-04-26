import { Question } from './question';

export interface Quiz {
  id: string;
  questions: {};
  questionList: Question[];
  score: number;
  studentId: string;
  createdAt: string;
  startedAt: string;
  status: string;
  level: string;
}
