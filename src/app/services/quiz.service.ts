import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../models/quiz";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private api: string = 'https://quisofka-mvn-b-production.up.railway.app/quisofka/quizzes/quizzes';

  constructor(private http: HttpClient) {
  }

  generateQuiz(studentId: string, level: string) {
    var levelPath = "";
    switch (level.toLowerCase()) {
      case "initial":
        levelPath = "firstlvl";
        break;

      case "basic":
        levelPath = "secondlvl";
        break;

      case "intermediate":
        levelPath = "thirdlvl";
        break;
    }
    return this.http.post(this.api + "/" + levelPath, {studentId: studentId});
  }

}
