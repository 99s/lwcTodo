import { LightningElement, api } from 'lwc';

export default class ToDoItem extends LightningElement {
    
    @api _todoId;
    @api _todoName;
    @api _done = false;


}