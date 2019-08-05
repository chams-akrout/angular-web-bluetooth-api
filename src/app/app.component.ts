import { Component, ViewChild, ElementRef } from '@angular/core';
declare const connectjs: any;
declare const disconnect: any;
declare const send: any;
declare const initializeDataBase: any;
declare const receive: any;
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChattApp';
  sendMessageForm: FormGroup;
  @ViewChild('MsgR') MsgR: ElementRef;
  MsgS: String = '';
  characteristic: BluetoothRemoteGATTCharacteristic;
  decoder = new TextDecoder('utf-8');
  tab=new Array();
  constructor(private formBuilder: FormBuilder) {

    this.sendMessageForm = this.formBuilder.group({
      message: ['', [Validators.required, Validators.minLength(2)]]

    });
  }

ngOnInit(){
  //this.characteristic = send("message ");
 // initializeDataBase()
}

  connect() {
    connectjs();
  }
  sendM() {

    send(this.sendMessageForm.controls.message.value);
  
     // this.tab=read()
  }

  receiveM() {
//console.log("rec",this.tab)
    receive();
  }

  disConnect() {
    disconnect()
  }
}
