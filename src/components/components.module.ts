import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { TodolistComponent } from './todolist/todolist';
@NgModule({
	declarations: [LoginComponent,
    TodolistComponent],
	imports: [],
	exports: [LoginComponent,
    TodolistComponent]
})
export class ComponentsModule {}
