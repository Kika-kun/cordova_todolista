import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodolistPage } from './todolist';
import { TodolistComponent } from '../../components/todolist/todolist';

@NgModule({
  declarations: [
    TodolistPage,
    TodolistComponent, 
  ],
  imports: [
    IonicPageModule.forChild(TodolistPage),
  ],
})
export class TodolistPageModule {}
