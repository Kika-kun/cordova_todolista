import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialTodoPage } from './social-todo';

@NgModule({
  declarations: [
    SocialTodoPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialTodoPage),
  ],
})
export class SocialTodoPageModule {}
