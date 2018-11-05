import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Feedback } from '../feedback.model';
import { FeedbackService} from '../feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit, OnDestroy {
  // feedback = [
    // {title: 'First', content: 'content'},
    // {title: 'Second', content: 'content'},
    // {title: 'Third', content: 'content'}
  // ];
  feedback: Feedback[] = [];
  private feedSub: Subscription;

  constructor(public feedbackService: FeedbackService) {}

  ngOnInit() {
    this.feedbackService.getFeedback();
    this.feedSub = this.feedbackService.getFeedbackUpdateListener().subscribe((feedback: Feedback[]) => {
      this.feedback = feedback;
    });
  }

  ngOnDestroy() {
    this.feedSub.unsubscribe();
  }
}
