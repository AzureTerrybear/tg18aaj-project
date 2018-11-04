import { Feedback } from './feedback.model';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FeedbackService {
  private feedback: Feedback[] = [];
  private feedbackUpdated = new Subject<Feedback[]>();

  getFeedback() {
    return [...this.feedback];
  }

  getFeedbackUpdateListener() {
    return this.feedbackUpdated.asObservable();
  }

  addFeedback(title: string, content: string) {
    const feed: Feedback = {title: title, content: content};
    this.feedback.push(feed);
    this.feedbackUpdated.next([...this.feedback]);
  }
}
