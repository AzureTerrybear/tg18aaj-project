import { Component, Input } from '@angular/core';

import { Feedback } from '../feedback.model';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent {
  // feedback = [
    // {title: 'First', content: 'content'},
    // {title: 'Second', content: 'content'},
    // {title: 'Third', content: 'content'}
  // ];
  @Input() feedback: Feedback[] = [];
}
