import {Component, Input, OnInit} from '@angular/core';
import {Question} from 'src/app/models/question';
import {Quiz} from 'src/app/models/quiz';
import {QuizService} from 'src/app/services/quiz.service';
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {interval} from "rxjs";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.scss'],
})
export class QuestionContainerComponent implements OnInit {
  protected readonly Array = Array;
  interval$: any;
  faClock = faClock;
  timer: number = 10;
  questions: Question[] = [];
  currentQuestion: Question = this.questions[0];
  currentQuestionIndex: number = 0;
  amountOfQuestions: number = 3;
  answers:any[] = [];
  correctAnswer:any[] = [];
  selectedAnswers: any[] = [];

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

  constructor(private service: QuizService, private route: Router) {}

  ngOnInit(): void {
    this.startCounter();
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
    this.interval$.unsubscribe();
    this.quiz.status = 'FINISHED';
    this.checkAnswers(this.quiz.questionList[this.currentQuestionIndex]);
    this.calculateScore();
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
      this.correctAnswer.push(theAnswers[key]);
    }
  }

  calculateScore() {
    for (let i = 0; i < this.quiz.questions.length; i++) {
      if (this.quiz.questions[i][1] === true) {
        this.quiz.score += 2;
      }
    }
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer % 60;
    return `${mm}:${ss}`;
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.onSubmit();
        Swal.fire({
          title: 'Time is over',
          text: 'The quiz will be submitted automatically',
          icon: 'warning',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate(['/test-result']);
          }
        });
      }
    });
  }

}
