import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Feedback } from '../feedback.model';
import { FeedbackService } from '../feedback.service';


@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  constructor(public feedbackService: FeedbackService) {}

  onAddFeedback(form: NgForm) {
    if (form.invalid) {
      return;
    }
    alert('Feedback successful');
    const feed: Feedback = {
      title: form.value.title,
      content: form.value.content
    };
    this.feedbackService.addFeedback(form.value.title, form.value.content);
    form.resetForm();
  }
}
