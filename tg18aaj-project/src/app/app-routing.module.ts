import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import { FeedbackCreateComponent } from './feedback/feedback-create/feedback-create.component';

const routes: Routes = [
  // '' defines the first page of the site
  { path: '', component: FeedbackListComponent },
  { path: 'create', component: FeedbackCreateComponent },
  { path: 'edit/:feedId', component: FeedbackCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
