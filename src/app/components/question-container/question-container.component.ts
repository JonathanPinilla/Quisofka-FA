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
    questions: [
      ["q1", false],
      ["q2", false],
      ["q3", false],
    ],
    questionList: [
      {
        id: 'q1',
        description: "¿Cuál es el propósito principal de Java?",
        answers: [
          ["Crear páginas web", false],
          ["Crear aplicaciones móviles", false],
          ["Crear videojuegos", true],
          ["Crear software de escritorio", true],
        ],
        descriptor: "Fundamentos",
        knowledgeArea: "Java",
        type: "multiple",
        level: "initial"
      },
      {
        id: 'q2',
        description: "¿Qué es Java?",
        answers: [
          ["Un lenguaje de programación", true],
          ["Una marca de café", false],
          ["Una ciudad en Indonesia", false],
          ["Un tipo de flor", false],
        ],
        descriptor: "Fundamentos",
        knowledgeArea: "Java",
        type: "single",
        level: "initial"
      },
      {
        id: 'q3',
        description: "¿Qué es un método en Java?",
        answers: [
          ["False", false],
          ["True", true]
        ],
        descriptor: "Fundamentos",
        knowledgeArea: "Java",
        type: "truefalse",
        level: "initial"
      },
    ],
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
    //this.getQuiz();
    this.selectedAnswers = new Array(this.quiz.questionList[this.currentQuestionIndex].answers.length).fill(false);
    this.amountOfQuestions = this.quiz.questionList.length-1;
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
    this.service.getQuizById('GDEO-0294').subscribe((result: Quiz) => {
      this.quiz = result;
      this.questions = result.questionList;
      //this.getAnswers(result.questionList[0].answers);
    });
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

  /*getAnswers(theAnswers:any){
    for(const key in theAnswers){
      this.answers.push(key);
      this.correctAns.push(theAnswers[key]);
    }
  }*/

  calculateScore() {
    this.quiz.score = 0;
  }

  protected readonly Array = Array;
}
