import { Todolist } from "./Todolist";

export class LocalUser {
    id: string;
    email: string;
    todolists: Todolist[];
    authorized: string[];

    constructor(id: string, email: string, todolists: Todolist[]) {
        this.id = id;
        this.email = email;
        this.todolists = todolists;
        this.authorized = null;
    }


}