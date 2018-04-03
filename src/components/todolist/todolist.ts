import { Component, Input } from '@angular/core';
import { Todolist } from '../../model/Todolist';

/**
 * Generated class for the TodolistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'todolist',
  templateUrl: 'todolist.html'
})
export class TodolistComponent {

  @Input()
  todolist: Todolist;

  constructor() {
    //console.log('Todolist: ' + this.todolist)
  }

}
