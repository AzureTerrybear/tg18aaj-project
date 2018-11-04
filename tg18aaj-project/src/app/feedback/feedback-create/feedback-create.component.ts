import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent {
  enteredValue = '';
  newFeedback = 'Please enter feedback';

  onAddFeedback() {
    alert('Feedback successful');
    this.newFeedback = this.enteredValue;
  }
}
