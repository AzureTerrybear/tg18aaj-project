import { Feedback } from './feedback.model';

import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from 'selenium-webdriver/http';
import { stringify } from '@angular/core/src/util';

@Injectable({providedIn: 'root'})
export class FeedbackService {
  private feedback: Feedback[] = [];
  private feedbackUpdated = new Subject<Feedback[]>();

  constructor(private http: HttpClient) {}

  getFeedback() {
    // return [...this.feedback];
    this.http.get<{message: string, feedback: Feedback[]}>('http://localhost:3000/api/feedback').subscribe((feedbackData) => {
        this.feedback = feedbackData.feedback;
        this.feedbackUpdated.next([...this.feedback]);
      });
  }

  getFeedbackUpdateListener() {
    return this.feedbackUpdated.asObservable();
  }

  addFeedback(title: string, content: string) {
    const feed: Feedback = { id: null, title: title, content: content};
    // optimistic updating?
    this.http.post<{message: string}>('http://localhost:3000/api/feedback', feed).subscribe((resData) => {
      console.log(resData.message);
      this.feedback.push(feed);
      this.feedbackUpdated.next([...this.feedback]);
    });

  }
}
