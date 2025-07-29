import { format } from "date-fns";

export default class Todo {
    constructor(title, priority = 3, dueDate = "", description = "Working on it!",  notes = "Working on it!", checklist = "Working on it!") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }
}

export function updateTodo(todo, { title, dueDate, priority }) {
    todo.title = title;
    todo.dueDate = dueDate;
    switch(priority) {
        case "low":
            todo.priority = 3;
            break;
        case "medium":
            todo.priority = 2;
            break;
        case "high":
            todo.priority = 1;
            break;
    }
}