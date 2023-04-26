import {Question} from "./question";

export interface Quiz{

  "id": string,
  "questions": {},
  "questionList": Question[],
  "score": number,
  "studentId": string,
  "createdAt": Date,
  "startedAt": Date,
  "status": string,
  "level": string

}
