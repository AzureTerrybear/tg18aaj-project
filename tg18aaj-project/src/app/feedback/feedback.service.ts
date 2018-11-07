import { Feedback } from './feedback.model';


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FeedbackService {
  private feedback: Feedback[] = [];
  private fbUpdated = new Subject<Feedback[]>();

  constructor(private http: HttpClient) {}

  getFeedback() {
    // return [...this.feedback];
    this.http.get<{ message: string; feedback: any }>('http://localhost:3000/api/feedback')
    // this is due to the observable nature
    // map allows you to change an array and re-store it
    .pipe(map((feedData) => {
      return feedData.feedback.map(feed => {
        return {
          title: feed.title,
          content: feed.content,
          // changes _id to id and saves to an array
          id: feed._id
        };
      });
    }))
    .subscribe((transFeed) => {
        this.feedback = transFeed;
        this.fbUpdated.next([...this.feedback]);
      });
  }

  getFeed(id: string) {
    // using the ... creates a duplicate of the object so that we do not manipulate data by mistake
    return { ...this.feedback.find(p => p.id === id) };
  }

  getFeedbackUpdateListener() {
    return this.fbUpdated.asObservable();
  }

  addFeedback(title: string, content: string) {
    const feed: Feedback = { id: null, title: title, content: content};
    // optimistic updating?
    this.http.post<{message: string, feedId: string}>('http://localhost:3000/api/feedback', feed).subscribe((resData) => {
      const id = resData.feedId;
      feed.id = id;
      this.feedback.push(feed);
      this.fbUpdated.next([...this.feedback]);
    });

  }

  updateFeed(id: string, title: string, content: string) {
    const feed: Feedback = { id: id, title: title, content: content };
    this.http
      .put('http://localhost:3000/api/feedback/' + id, feed)
      .subscribe(response => console.log(response));
  }

  delFeed(feedId: string) {
    this.http.delete('http://localhost:3000/api/feedback/' + feedId)
      .subscribe(() => {
        const updatedFeed = this.feedback.filter(feed => feed.id !== feedId);
        this.feedback = updatedFeed;
        this.fbUpdated.next([...this.feedback]);
      });
  }
}
