import { LocalUser } from "../model/LocalUser";
import { Todolist } from "../model/Todolist";
import { Todo } from "../model/Todo";

export class Utils {
    removeTodolist(u: LocalUser, tlId: number) {
        for (let t of u.todolists) {
            if (t.id == tlId) {
                u.todolists.splice(u.todolists.indexOf(t), 1);
                break;
            }
        }
    }

    editTodolistTitle(u: LocalUser, tlId: number, title: string) {
        for (let t of u.todolists) {
            if (t.id == tlId) {
                this.setTitle(u.todolists[u.todolists.indexOf(t)], title);
            }
        }
    }

    removeTodoFromUser(u: LocalUser, tlId: number, tId: number) {
        for (let t of u.todolists) {
            if (t.id == tlId) {
                this.removeTodo(u.todolists[u.todolists.indexOf(t)], tId);
                break;
            }
        }
    }

    editTodoTextFromUser(u: LocalUser, tlId: number, tId: number, text: string) {
        for (let t of u.todolists) {
            if (t.id == tlId) {
                this.editTodoText(u.todolists[u.todolists.indexOf(t)], tId, text);
                break;
            }
        }
    }

    addTodolist(u: LocalUser, title: string) {
        if (u.todolists == null) {
            u.todolists = new Array<Todolist>();
        }

        let i = -1
        for (const t of u.todolists) {
        i = Math.max(t.id, i);
        }
        u.todolists.push(new Todolist(title, i+1));
    }


    setTitle(t: Todolist, title: string) {
        t.title = title;
    }
     
    removeTodo(t: Todolist, tId: number) {
        for (let tt of t.todos) {
            if (tt.id == tId) {
                t.todos.splice(t.todos.indexOf(tt), 1);
                break;
            }
        }
    }

    editTodoText(t: Todolist, tlId: number, text: string) {
        for (let tt of t.todos) {
            if (tt.id == tlId) {
                this.editText(t.todos[t.todos.indexOf(tt)], text);
                break;
            }
        }
    }


    editText(t: Todo, text: string) {
        t.text = text;
    }
}