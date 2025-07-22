import { format } from "date-fns";

export default class Todo {
    constructor(title, priority = 3, dueDate = "", description = "",  notes = "", checklist = "Working on it!") {
        this.title = title;
        this.description = description;
        this.dueDate = validateDate(dueDate);
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }

    update(title, dueDate, priority) {
        this.title = title;
        console.log(dueDate)
        this.dueDate = validateDate(dueDate);
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

function validateDate(date) {
    if (date == "") {
        return format(new Date(), "eee MMM/dd/yyyy");
    } else {
        return format(date, "eee MMM/dd/yyyy");
    }
}