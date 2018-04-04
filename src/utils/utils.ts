import { TodoPageModule } from './../pages/todo/todo.module';
import { AngularFireDatabase } from 'angularfire2/database';
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

    addTodolistComplete(u: LocalUser, t: Todolist) {
        if (u.todolists == null) {
            u.todolists = new Array<Todolist>()
        }
        u.todolists.push(t);
    }

    addTodoFromUser(u: LocalUser, tlId: number, text: string) {
        if (u.todolists != null) {
            console.log("1")
            for (let tl of u.todolists) {
                if (tl.id == tlId) {
                    console.log('2')
                    this.addTodo(u.todolists[u.todolists.indexOf(tl)], text);
                }
            }
        }
    }

    setTodoFromUser(u: LocalUser, tlId: number, tId: number, state: boolean) {
        if (u && u.todolists) {
            for (let tl of u.todolists) {
                if (tl.id == tlId) {
                    this.setTodoFromTodolist(u.todolists[u.todolists.indexOf(tl)], tId, state);
                }
            }
        }
    }


    setTitle(t: Todolist, title: string) {
        t.title = title;
    }
     
    addTodo(t: Todolist, text: string) {
        let i = -1;
        if (t.todos == null) {
            t.todos = new Array<Todo>()
        }

        for (let tt of t.todos) {
            i = Math.max(i, tt.id)
        }
        console.log("4")

        console.log('5')
        t.todos.push(new Todo(text, i+1))
        console.log('6')
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

    setTodoFromTodolist(tl: Todolist, tId: number, state: boolean) {
        if (tl && tl.todos) {
            for (let t of tl.todos) {
                if (t.id == tId) {
                    this.setTodo(tl.todos[tl.todos.indexOf(t)], state);
                }
            }
        }
    }

    editText(t: Todo, text: string) {
        t.text = text;
    }

    setTodo(t: Todo, state: boolean) {
        t.done = state;
    }


    addAuthorize(currentUser: LocalUser, email: string) {
        if (currentUser.authorized == null) {
            currentUser.authorized = new Array<string>();
        }
        currentUser.authorized.push(email)
    }

    removeAuthorize(currentUser: LocalUser, email: string) {
        if (currentUser.authorized == null) {
            return
        }
        currentUser.authorized.splice(currentUser.authorized.indexOf(email), 1);
    }
}