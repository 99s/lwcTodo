import { LightningElement, api } from 'lwc';

export default class TodoItemComponent extends LightningElement {
    @api todoId;
    @api todoName;
    @api done = false;

    get containerClass(){
        return this.done ? "todo-class completed-class" : "todo-class upcoming-class";
    }
}