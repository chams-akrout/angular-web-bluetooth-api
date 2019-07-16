import { Component } from '@angular/core';
declare const connectjs: any;
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChattApp';
  sendMessageForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {

    this.sendMessageForm = this.formBuilder.group({
      message: ['', [Validators.required, Validators.minLength(2)]]

    });
  }
connect() {
    connectjs();
  }
  sendM(){
    
  }
}
