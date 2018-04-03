import { Todolist } from "./Todolist";

export class LocalUser {
    id: string;
    email: string;
    todolists: Todolist[];

    constructor(id: string, email: string, todolists: Todolist[]) {
        this.id = id;
        this.email = email;
        this.todolists = todolists;
    }


}