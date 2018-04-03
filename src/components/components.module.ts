import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { TodolistComponent } from './todolist/todolist';
import { TodoComponent } from './todo/todo';
@NgModule({
	declarations: [LoginComponent,
    TodolistComponent,
    TodoComponent],
	imports: [],
	exports: [LoginComponent,
    TodolistComponent,
    TodoComponent]
})
export class ComponentsModule {}
