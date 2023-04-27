import {Component, Input, OnInit} from '@angular/core';
import {Question} from 'src/app/models/question';
import {Quiz} from 'src/app/models/quiz';
import {QuizService} from 'src/app/services/quiz.service';

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
  amountOfQuestions: number = 15;
  quiz: any = {
    id: '',
    questions: {},
    questionList: [],
    score: 0,
    studentId: '',
    createdAt: '',
    startedAt: '',
    status: '',
    level: '',
  };

  answers:any[] = [];
  correctAns:any[] = [];

  constructor(private service: QuizService) {

  }

  ngOnInit(): void {
    this.getQuiz();
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

  getQuiz() {
    this.service.getQuizById('GDEO-0294').subscribe((result: Quiz) => {
      this.quiz = result;
      this.questions = result.questionList;
      this.getAnswers(result.questionList[0].answers);
    });
  }

  getAnswers(theAnswers:any){
    for(const key in theAnswers){
      this.answers.push(key);
      this.correctAns.push(theAnswers[key]);
    }
  }

  calculateScore() {
    this.quiz.score = 0;
  }
}
