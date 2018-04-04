import { NavbarModule } from './../../components/navbar/navbar.module';
import { TodoComponent } from './../../components/todo/todo';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoPage } from './todo';

@NgModule({
  declarations: [
    TodoPage,
    TodoComponent
  ],
  imports: [
    IonicPageModule.forChild(TodoPage),
    NavbarModule
  ],
})
export class TodoPageModule {}
