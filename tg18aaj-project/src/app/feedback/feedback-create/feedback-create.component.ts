import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

// import { Feedback } from '../feedback.model';
import { FeedbackService } from '../feedback.service';
import { Feedback } from '../feedback.model';


@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  feed: Feedback;
  private mode = 'create';
  private feedId: string;

  constructor(public feedbackService: FeedbackService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('feedId')) {
        this.mode = 'edit';
        this.feedId = paramMap.get('feedId');
        this.feed = this.feedbackService.getFeed(this.feedId);
      } else {
        this.mode = 'create';
        this.feedId = null;
      }
    });
  }

  onAddFeedback(form: NgForm) {
    if (form.invalid) {
      return;
    }
  //  alert('Feedback successful');
  //  const feed: Feedback = {
  //    title: form.value.title,
  //    content: form.value.content
  //  };
  if (this.mode === 'create') {
    this.feedbackService.addFeedback(form.value.title, form.value.content);
  } else {
    this.feedbackService.updateFeed(
      this.feedId,
      form.value.title,
      form.value.content
    );
  }
  form.resetForm();
}
}
