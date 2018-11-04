import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Feedback } from '../feedback.model';


@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() feedbackCreated = new EventEmitter<Feedback>();

  onAddFeedback(form: NgForm) {
    alert('Feedback successful');
    const feed: Feedback = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.feedbackCreated.emit(feed);
  }
}
