import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  title: string = 'Logged in';
  iconn: string = 'success';

  form: FormGroup = new FormGroup({})
  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  @ViewChild('confirmRejectSwal')
  public readonly confirmRejectSwal!: SwalComponent;

  onSubmit(){
    if(this.form.valid){
      this.title = 'Logged in';
      this.iconn = 'success';
      this.confirmRejectSwal.fire()
    }else{
      this.iconn = 'error';
      this.title = 'Not logged in';
      this.confirmRejectSwal.fire()
    }
  }
}
