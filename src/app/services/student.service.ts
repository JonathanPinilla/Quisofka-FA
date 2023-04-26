import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private api: string = "https://quisofka-mvn-b-production.up.railway.app/quisofka/quizzes/students";

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any>{
    return this.http.get(this.api);
  }

  getStudentByEmail(email: string): Observable<Student>{
    return this.http.get<Student>(this.api + "/byEmail/" + email);
  }

  getStudentById(id: string): Observable<Student>{
    return this.http.get<Student>(this.api + "/" + id);
  }

}
