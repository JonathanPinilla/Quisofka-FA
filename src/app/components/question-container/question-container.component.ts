import { Component, Input, OnInit } from '@angular/core';
import { Answers } from 'src/app/models/answers';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.scss'],
})
export class QuestionContainerComponent implements OnInit {
  displayTimer: number = 60;
  questions: Question[] = [];
  currentQuestion: Question = this.questions[0];
  currentQuestionIndex: number = 1;
  amountOfQuestions: number = 5;
  answers: Answers[] = [];

  quizList: Quiz[] = [];

  quiz: Quiz = {
    id: '',
    questions: {},
    questionList: [
      {
        id: '',
        description: '',
        answers: {},
        knowledgeArea: '',
        descriptor: '',
        type: '',
        level: '',
      },
    ],
    score: 2000,
    studentId: '',
    createdAt: '',
    startedAt: '',
    status: '',
    level: '',
  };

  constructor(private service: QuizService) {}

  ngOnInit(): void {
    this.service.getQuizById('GDEO-0294').subscribe({
      next: (quiz) => {
        this.quiz = quiz;
        console.log(this.quiz);
      },
      error: console.log,
      complete: console.log,
    });
    console.log(this.quiz);

    this.currentQuestion = this.quiz.questionList[this.currentQuestionIndex];
  }

  onNextQuestionClick() {
    if (this.currentQuestionIndex < this.amountOfQuestions) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.currentQuestionIndex += 1;
    }
  }

  onSubmit() {
    this.quiz.status = 'submitted';
    //TODO: verify the code
  }

  calculateScore() {
    this.quiz.score = 0;
  }
}
