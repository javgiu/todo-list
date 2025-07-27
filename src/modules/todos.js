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

    update(title, dueDate, priority) {
        this.title = title;
        this.dueDate = dueDate;
        switch(priority) {
            case "low":
                this.priority = 3;
                break;
            case "medium":
                this.priority = 2;
                break;
            case "high":
                this.priority = 1;
                break;
        }
    }
}