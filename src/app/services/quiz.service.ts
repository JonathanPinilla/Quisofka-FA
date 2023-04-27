
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private api: string = 'https://quisofka-mvn-b-production.up.railway.app/quisofka/quizzes/quizzes';
  constructor(private http: HttpClient) {}

  generateQuiz(studentId: string):Observable<Quiz>{
    return this.http.post<Quiz>(this.api, {studentId: studentId});
  }

  getQuizById(id: string){
    return this.http.get<Quiz>(`${this.api}/${id}`);
  }

  sendEmail(email: string, name:string, quizCode: string) {
    this.http.post(`${this.api}/emails/generatedCode/${quizCode}`, {to: email, studentName: name}).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
}
