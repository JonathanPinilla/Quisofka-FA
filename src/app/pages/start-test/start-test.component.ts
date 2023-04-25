import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.scss']
})
export class StartTestComponent {

  title: string = 'Logged in';
  iconn: string = 'success';

  form: FormGroup = new FormGroup({})
  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      code: ['', [Validators.required]],
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
