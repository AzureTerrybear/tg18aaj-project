import { Component } from '@angular/core';

import { Feedback } from './feedback/feedback.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tg18aaj-project';
  storedFeedback: Feedback[] = [];

  onFeedbackAdded(feed) {
    this.storedFeedback.push(feed);
  }
}
