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
  score: number = 26;
  previousLevel: string = '';
  achievedLevel: string = '';
  questions: any[] = [];
  rightAnswers: number = 0;
  amountOfQuestions: number = 0;

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
    this.getQuiz();
  }

  getQuiz() {
    if (localStorage.getItem('quizId') != null) {
      this.service
        .getQuizById(localStorage.getItem('quizId')!)
        .subscribe((result: Quiz) => {
          this.quiz = result;
          this.getQuestions(result.questions);
          this.amountOfQuestions = result.questions.length;
          this.previousLevel = result.level;
          this.newLevel();
          this.countRightAnswers();
        });
    }
  }

  newLevel() {
    console.log(this.score);
    if (this.score >= 26) {
      console.log('here');
      console.log(this.previousLevel);
      if (this.previousLevel === 'INITIAL') {
        this.achievedLevel = 'BASIC';
      }
      if (this.previousLevel === 'BASIC') {
        console.log('here');
        this.achievedLevel = 'INTERMEDIATE';
      }
    } else {
      this.achievedLevel = this.previousLevel;
    }
  }

  getQuestions(questions: any[]) {
    for (const question of questions) {
      this.questions.push(question);
    }
  }

  countRightAnswers() {
    for (const question of this.questions) {
      if (question[1] === true) {
        this.rightAnswers += 1;
      }
    }
  }

  onContinue() {
    localStorage.removeItem('quizId');
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
