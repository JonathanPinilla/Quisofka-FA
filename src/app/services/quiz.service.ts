
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import {Student} from "../models/student";

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private api: string = 'https://quisofka-mvn-b-production.up.railway.app/quisofka/quizzes';
  constructor(private http: HttpClient, private auth: Auth) {}

  generateQuiz(studentId: string):Observable<Quiz>{
    return this.http.post<Quiz>(this.api+"/quizzes", {studentId: studentId});
  }

  getQuizById(id: string){
    return this.http.get<Quiz>(`${this.api}/quizzes/${id}`);
  }

  sendEmail(email: string, name:string, quizCode: string, stuent: Student) {
    this.http.post(`${this.api}/emails/generatedCode/${quizCode}`, {to: email, studentName: name}).subscribe(
      (res) => {
        console.log(res);
        this.registerFirebase(stuent).then().catch(
          (err) => {
            console.log(err);
          }
        );
      }
    );
  }

  registerFirebase(stuent: Student){
    return createUserWithEmailAndPassword(this.auth, stuent.email, stuent.id);
  }

  loginFirebase(email: string, userId: string){
    return signInWithEmailAndPassword(this.auth, email, userId);
  }

  logOutFirebase(){
    return signOut(this.auth)
  }
}
