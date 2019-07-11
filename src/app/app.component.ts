import { Component } from '@angular/core';
declare const connectJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChattApp';

connect() {
    connectJS();
  }

}
