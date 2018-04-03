import { Todo } from "./Todo";

export class Todolist {
    id: number;
    todos: Todo[];
    title: string;

    constructor(title: string, id: number) {
        this.title = title;
        this.id = id;
        this.todos = null;
    }

   
}