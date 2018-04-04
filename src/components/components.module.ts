import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { TodolistComponent } from './todolist/todolist';
import { TodoComponent } from './todo/todo';
import { NavbarComponent } from './navbar/navbar';
@NgModule({
	declarations: [LoginComponent,
    TodolistComponent,
    TodoComponent,
    NavbarComponent],
	imports: [],
	exports: [LoginComponent,
    TodolistComponent,
    TodoComponent,
    NavbarComponent]
})
export class ComponentsModule {}
