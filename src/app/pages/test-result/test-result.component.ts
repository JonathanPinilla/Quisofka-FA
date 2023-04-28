import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss'],
})
export class TestResultComponent implements OnInit {
  score: number = 0;
  previousLevel: string = '';
  achievedLevel: string = '';
  questions: any[] = [];
  rightAnswers: number = 0;
  amountOfQuestions: number = 0;

  quiz: Quiz = {
    id: '',
    questions: [],
    questionList: [],
    score: 0,
    studentId: '...',
    createdAt: '...',
    startedAt: '...',
    status: '...',
    level: '...',
  };

  constructor(private service: QuizService, private route: Router) {}

  ngOnInit(): void {
    this.quiz.id = localStorage.getItem('quizId')!;
    this.getQuiz();
  }

  getQuiz() {
    if (localStorage.getItem('quizId') != null) {
      this.service.getQuizById(localStorage.getItem('quizId') || this.quiz.id)
        .subscribe((result: Quiz) => {
          this.quiz = result;
          this.questions = result.questions;
          console.log(this.questions);
          this.amountOfQuestions = result.questions.length;
          this.previousLevel = result.level;
          this.setScore(result.score);
          console.log(result.score);
          this.countRightAnswers(result.questions);
          this.newLevel();
        });
    }else {
      console.log('No quiz id');
    }
  }

  newLevel() {
    if (this.score >= 26) {
      if (this.previousLevel === 'INITIAL') {
        this.achievedLevel = 'BASIC';
      }
      if (this.previousLevel === 'BASIC') {
        this.achievedLevel = 'INTERMEDIATE';
      }
    } else {
      this.achievedLevel = this.previousLevel;
    }
  }

  setScore(score: number){
    this.score = score;
  }

  calculateScore(questions:any) {
    for (let i = 0; i < questions; i++) {
      if (this.quiz.questions[i][1] === true) {
        this.score += 2;
      }
    }
  }

  getQuestions(questions: any[]) {
    for (const question of questions) {
      this.questions.push(question);
    }
  }

  countRightAnswers(TheQuestions: any) {
    for (const question of TheQuestions) {
      if (question[1] === true) {
        this.rightAnswers += 1;
      }
    }
  }

  onContinue() {
    localStorage.removeItem('quizId');
    localStorage.removeItem('quizLevel');
    localStorage.removeItem('studentName');

    this.service.logOutFirebase().then(() => {
    }).catch((error) => {
      console.log(error);
    });

    this.service.setQuizData({
      quizLevel: 'not in quiz',
      studentName: '...',
    })

    Swal.fire({
      title: 'Congratulations!',
      text: 'You have successfully completed the test!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/home-page']);
      }
    });
  }
}
