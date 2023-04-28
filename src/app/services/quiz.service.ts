
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Quiz } from '../models/quiz';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import {Student} from "../models/student";
import {QuizData} from "../models/quizData";

@Injectable({
  providedIn: 'root',
})
export class QuizService {

  quizData: QuizData = {
    studentName: localStorage.getItem('studentName') || 'loading...',
    quizLevel: localStorage.getItem('quizLevel') || '...',
  };
  private quizDataSubject = new Subject<QuizData>();


  private api: string = 'https://quisofka-mvn-b-production.up.railway.app/quisofka/quizzes';
  constructor(private http: HttpClient, private auth: Auth) {}

  generateQuiz(studentId: string):Observable<Quiz>{
    return this.http.post<Quiz>(this.api+"/quizzes", {studentId: studentId});
  }

  startTest(quizId: string):Observable<Quiz>{
    return this.http.patch<Quiz>(this.api+"/quizzes/start/"+quizId,{});
  }

  saveResults(quiz: Quiz){
    return this.http.patch(this.api+"/quizzes/submit/"+quiz.id, quiz);
  }

  sendResultToEmail(quiz: Quiz, student: Student):Observable<Quiz>{
    return this.http.post<Quiz>(this.api+"/emails/quizResult/"+quiz.score, {to: student.email, studentName: student.name});
  }

  getQuizById(id: string){
    return this.http.get<Quiz>(`${this.api}/quizzes/${id}`);
  }

  getQuizData(){
    return this.quizDataSubject.asObservable();
  }

  setQuizData(quizData: QuizData){
    this.quizData = quizData;
    this.quizDataSubject.next(quizData);
  }
  getInitialQuizData(){
    return this.quizData;
  }


  sendEmail(email: string, name:string, quizCode: string, student: Student) {
    this.http.post(`${this.api}/emails/generatedCode/${quizCode}`, {to: email, studentName: name}).subscribe(
      (res) => {
        this.registerFirebase(student).then().catch(
          (err) => {
            console.log(err);
          }
        );
      }
    );
  }

  registerFirebase(student: Student){
    return createUserWithEmailAndPassword(this.auth, student.email, student.id);
  }

  loginFirebase(email: string, userId: string){
    return signInWithEmailAndPassword(this.auth, email, userId);
  }

  logOutFirebase(){
    return signOut(this.auth)
  }
}
