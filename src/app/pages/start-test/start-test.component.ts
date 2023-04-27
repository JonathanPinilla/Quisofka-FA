import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {QuizService} from "../../services/quiz.service";
import {Quiz} from "../../models/quiz";
import {Router} from "@angular/router";
import {SweetAlertIcon} from "sweetalert2";
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.scss']
})
export class StartTestComponent implements OnInit {

  swalTitle: string = '';
  swalText: string = '';
  swalIcon: SweetAlertIcon = 'info';
  swalConfirm: boolean = false;


  form: FormGroup = new FormGroup({})

  constructor(
    private builder: FormBuilder,
    private quizService: QuizService,
    private route: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      code: ['', [Validators.required]],
    })
    localStorage.removeItem('quizId');
  }

  @ViewChild('confirmRejectSwal')
  public readonly confirmRejectSwal!: SwalComponent;

  onSubmit() {

    this.swalConfirm = false;
    this.swalTitle = 'Loading...';
    this.swalIcon = 'info';
    this.swalText = 'Please wait...';

    var quiz: Quiz = {
      id: '',
      questions: [],
      questionList: [],
      score: 0,
      studentId: '',
      createdAt: '',
      startedAt: '',
      status: '',
      level: '',
    };

    var hoursPassed: number = -1;
    this.quizService.getQuizById(this.form.value.code).subscribe({
      next: (result: Quiz) => {
        quiz = result;
        console.log(quiz);
        hoursPassed = this.calculateHoursPassed(result.createdAt);
        console.log(hoursPassed);
        if (hoursPassed < 24) {
          localStorage.setItem('quizId', this.form.value.code);
          this.swalTitle = 'The quiz is ready!';
          this.swalIcon = "success";
          this.swalText = 'You can now start the test, pres ok to continue';
          this.swalConfirm = true;
          this.studentService.getStudentById(quiz.studentId).subscribe({
            next: (result) => {
              this.quizService.loginFirebase(result.email, result.id).
              then(() => {
                console.log("Authentication success");
              }).
              catch((error) => {
                console.log(error);
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('completed');
            }
          });
        } else {
          this.swalTitle = 'Code has expired!';
          this.swalIcon = "error";
          this.swalText = 'Please contact the admin to get a new code';
          this.swalConfirm = false;
        }
      },
      error: (err: any) => {
        console.log(err);
        this.swalTitle = 'This test does not exist';
        this.swalIcon = "error";
        this.swalText = 'Please check it or contact the admin to get a new one';
        this.swalConfirm = false;
      },
      complete: () => {
        console.log('completed');
      }
    });

    this.confirmRejectSwal.fire();

  }

  calculateHoursPassed(receivedDate: any): number {
    var currentDateString: string = new Date().toISOString();
    const receivedDateTime = new Date(receivedDate); // Convert received string to Date object
    const currentDateTime = new Date(currentDateString); // Convert current string to Date object

    const millisecondsPassed = currentDateTime.getTime() - receivedDateTime.getTime(); // Calculate difference in milliseconds
    const hoursPassed = Math.floor(millisecondsPassed / (1000 * 60 * 60)); // Convert milliseconds to hours

    return hoursPassed;
  }

  goToStartTest() {
    this.route.navigate(['/taking-test']);
  }
}
