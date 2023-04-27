import { Component } from '@angular/core';
import {QuizData} from "../../models/quizData";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent {

  quizData: any = {};

  constructor(private service: QuizService) { }

  ngOnInit(): void {
    this.quizData = this.service.getInitialQuizData();
    this.service.getQuizData().subscribe((result: QuizData) => {
      this.quizData = result;
    });
  }



}
