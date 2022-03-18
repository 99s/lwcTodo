import { LightningElement, track } from 'lwc';
import getCurrentTodos from "@salesforce/apex/ToDoController.getCurrentTodos";
import addTodo from "@salesforce/apex/ToDoController.addTodo";

export default class ToDoManager extends LightningElement {
    //but it works without track as well
    @track _time = null;
    @track _greeting = null;
    @track todoS = [];

     connectedCallback(){
        this.timeNow();

        setInterval(() => {
            this.timeNow();
            console.log('setIntervalrunning '+ this._time);
        },1000*1)
     }


    timeNow(){
        const date = new Date();
         
         var hour = date.getHours();
         var minute = date.getMinutes();
         this._time = date.toLocaleTimeString();
         //this._time = `${this.getHours(hour)}:${this.getdoubleDigit(minute)}  ${this.getAMPM(hour)}`;

         this.setGreeting(hour);
    }

    getHours(h){
            return h===0 ? 12 : (h > 12 ? (h-12) : h);
    }

    getAMPM(h){
        return h >= 12 ? 'PM' : 'AM';
    
    }

    getdoubleDigit(d){
        return (d < 10) ? "0"+d : d;
    }


    setGreeting(h){
        if(h<12){
            this._greeting = 'Guuuuoooooouuud Moarrning!';

        }else if(h >= 12 && h < 17){
            this._greeting = "Good Afternoon :]";
        }
        else{
            this._greeting = "Good Night zzzzzz!";
        }
    }

    /*Todo part */

    addTodoHandler(){
        const inputBox = this.template.querySelector('lightning-input');
        console.log('added todo ',inputBox.value);
        
        const todoItem = {
            todoName : inputBox.value,
            done : false
        }
        addToDo({payload : JSON.stringify(todoItem)}).then(response => {
            console.log('item '+todoItem.todoId+ ' added');
            this.todoS.push(todoItem);
        }).catch(error => {
              console.error('Error Inserting Todo:',error);
        });

        
        inputBox.value = "";
    }

    get upcomingTasks(){
        return this.todoS && this.todoS.length 
        ? this.todoS.filter( todo => !todo.done) 
        : [];
    }

    get completedTasks(){
        return this.todoS && this.todoS.length 
        ? this.todoS.filter( todo => todo.done) 
        : [];
    }
}