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
  currentQuestionIndex: number = 0;
  amountOfQuestions: number = 3;
  quiz: any = {
    id: '',
    questions: [],
    questionList: [],
    score: 0,
    studentId: 'stId',
    createdAt: '',
    startedAt: '',
    status: 'Generated',
    level: 'initial',
  };

  answers:any[] = [];
  correctAns:any[] = [];
  selectedAnswers: any[] = [];

  constructor(private service: QuizService) {

  }

  ngOnInit(): void {
    this.getQuiz();
  }


  onNextQuestionClick() {
    if (this.currentQuestionIndex < this.amountOfQuestions) {
      this.currentQuestion = this.quiz.questionList[this.currentQuestionIndex];
      this.checkAnswers(this.currentQuestion);
      this.currentQuestionIndex += 1;
      this.selectedAnswers = new Array(this.quiz.questionList[this.currentQuestionIndex].answers.length).fill(false);
    }
  }

  onSubmit() {
    this.quiz.status = 'submitted';
    this.checkAnswers(this.quiz.questionList[this.currentQuestionIndex]);
    console.log(this.quiz.questionList[this.currentQuestionIndex].answers.length);
    console.log(this.quiz.questions);
    //TODO: verify the code
  }

  getQuiz() {
    if (localStorage.getItem('quizId') != null) {
      this.service.getQuizById(localStorage.getItem('quizId')!).subscribe((result: Quiz) => {
        this.quiz = result;
        this.questions = result.questionList;
        this.getAnswers(result.questionList[0].answers);
        this.selectedAnswers = new Array(this.quiz.questionList[this.currentQuestionIndex].answers.length).fill(false);
        this.amountOfQuestions = this.quiz.questionList.length-1;
      });
    }{
      console.log('Go to start quiz and send the quiz id');
    }

  }

  checkAnswers(question:any){
    console.log(question.answers.length);
    for(let i = 0; i < question.answers.length; i++){
      if (question.answers[i][1] != this.selectedAnswers[i]) {
        this.quiz.questions[this.currentQuestionIndex][1] = false;
        break;
      }else{
        this.quiz.questions[this.currentQuestionIndex][1] = true;
      }
    }
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

  protected readonly Array = Array;
}
