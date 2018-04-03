export class Todo {
    id: number;
    text: string;
    done: boolean;

    constructor(text: string, id: number) {
        this.id = id;
        this.text = text;
        this.done = false;
    }


}