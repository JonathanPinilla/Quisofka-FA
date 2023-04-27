import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {StudentService} from "../../services/student.service";
import {Student} from "../../models/student";
import * as sweetalert2 from "sweetalert2";
import {SweetAlertIcon} from "sweetalert2";
import {Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";
import {Quiz} from "../../models/quiz";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  swalTitle: string = '';
  swalText: string = '';
  swalIcon: SweetAlertIcon = 'info';
  swalConfirm: boolean = false;

  form: FormGroup = new FormGroup({})

  constructor(
    private builder: FormBuilder,
    private studentService: StudentService,
    private route: Router,
    private quizService: QuizService
  ){}

  ngOnInit(): void {
    this.form = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  @ViewChild('confirmRejectSwal')
  public readonly confirmRejectSwal!: SwalComponent;

  onSubmit() {

    this.swalConfirm = false;
    this.swalTitle = 'Loading...';
    this.swalIcon = 'info';
    this.swalText = 'Please wait...';


    var student: Student = {
      id: "",
      name: "",
      lastName: "",
      email: "",
      isAuthorized: false,
      level: ""
    };

    this.studentService.getStudentByEmail(this.form.value.email).subscribe({
      next: (result) => {
        student = result;
        if (student.isAuthorized && student.id != "" && student.name == this.form.value.name && student.lastName == this.form.value.lastName) {
          this.swalTitle = 'the code has ben generated successfully!';
          this.swalIcon = "success";
          this.swalText = 'You can now start test with the code sent to your email';
          this.swalConfirm = true;
          this.quizService.generateQuiz(student.id).subscribe({
            next: (result) => {
              console.log("Quiz generated level: " + student.level);
              this.quizService.sendEmail(student.email, student.name, result.id);
              //TODO: storage the quiz
            },
            error: (error) => console.log(error),
            complete: () => console.log('complete')
          });
        } else if(!student.isAuthorized && student.id != "") {
          this.swalTitle = 'You are not authorized to take the test yet';
          this.swalIcon = "warning";
          this.swalText = 'Please wait for the admin to authorize you';
          this.swalConfirm = false;

        } else {
          this.swalTitle = 'There was an error';
          this.swalIcon= "error";
          this.swalText = 'Please check your information';
          this.swalConfirm = false;
        }
      },
      error: (error) => {
        console.log(error);
        this.swalTitle = 'This email is not registered';
        this.swalIcon= "error";
        this.swalText = 'Please check it or contact the admin to register you';
        this.swalConfirm = false;
      },
      complete: () => {
        console.log('complete');
      }
    });

    this.confirmRejectSwal.fire();

  }

  goToStartTest(){
    this.route.navigateByUrl('start-test');
  }
}
