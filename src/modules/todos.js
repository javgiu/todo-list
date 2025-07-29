import { format } from "date-fns";

export default class Todo {
    constructor(title = "New Project", priority = 3, dueDate = new Date(), description = "Working on it!",  notes = "Working on it!", checklist = "Working on it!") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = validatePriority(priority);
        this.notes = notes;
        this.checklist = checklist;
    }
}

function validatePriority(priority) {
    switch(priority) {
        case "low":
            return priority = 3;
        case "medium":
            return priority = 2;
        case "high":
            return priority = 1;
        default:
            return priority;
    }
}