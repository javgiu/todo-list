import { appendTo, createElement, creator } from "../libraries/DOM";
import plus from "../assets/icons/plus.svg"
import deleteIcon from "../assets/icons/delete.svg";
import pubsub from "./PubSub";

const plusIcon = plus;
const deleteSvg = deleteIcon;
const contentDiv = document.querySelector("#content");
const currentDisplayedProjects = [];

pubsub.on("projectsUpdated", display);
pubsub.on("showNewProjectDialog", showProjectDialog)
pubsub.on("showNewTodoDialog", showTodoDialog);

export default function display(projects) {
    if(contentDiv.innerHTML !== "") {
        contentDiv.innerHTML = "";
    }
    projects.forEach(project => {

        const projectElement = createElement("div","project");

        const header = createElement("div", "project-header");
        const title = createElement("h2", "project-title", project.title);
        const deleteProjectButton = createElement("button", "delete-project-button");
        deleteProjectButton.innerHTML = deleteSvg;
        deleteProjectButton.dataset.id = "delete-project-button";
        deleteProjectButton.dataset.index = projects.indexOf(project);

        appendTo(header, title, deleteProjectButton);
        appendTo(projectElement, header);

        projectElement.dataset.id = projects.indexOf(project);

        const todoElements = project.todos.map(createTodoElement);

        todoElements.forEach(todoElement => appendTo(projectElement, todoElement));

        addAddTodoButton(projectElement);

        appendTo(contentDiv, projectElement)

        currentDisplayedProjects.push(projectElement);

    });

    createProjectDialog();
    createTodoDialog();
    pubsub.emmit("projectsDisplayed", currentDisplayedProjects);
}

function addAddTodoButton(parent) {
    const button = createElement("button", "add-todo-button");

    button.innerHTML = plusIcon;

    button.dataset.id = "add-todo-button";

    appendTo(parent, button);
}

function createTodoElement(todo, index) {
    const todoElement = createElement("div", "todo")

    todoElement.dataset.id = index;
    const todoTitle = createElement("h3", "todo-title", todo.title);

    const todoCheckbox = createElement("input", "checkbox");

    todoCheckbox.setAttribute("type", "checkbox");

    appendTo(todoElement, todoCheckbox, todoTitle);
    
    return todoElement;
}

function createProjectDialog() {

    const dialog = createElement("dialog", "project-dialog");
    dialog.setAttribute("closedBy", "any");

    const form = createElement("form");
    form.setAttribute("method", "dialog");

    const input = createElement("input", "project-name");
    input.setAttribute("placeholder", "Project Title");
    input.setAttribute("required", "true");

    const button = createElement("button");
    button.innerText = "Add Project";

    appendTo(form, input, button);
    appendTo(dialog, form)
    appendTo(contentDiv, dialog)

    pubsub.emmit("projectDialogCreated", {dialog, input, button});
}
function createTodoDialog() {

    if(document.querySelector(".todo-dialog")) return;

    const dialog = createElement("dialog", "todo-dialog");
    dialog.setAttribute("closedBy", "any");

    const form = createElement("form");
    form.setAttribute("method", "dialog");

    const title = createElement("h3", "form-title", "New Todo");

    const column1 = creator.labeledInput({id: "name", type: "text", required: true, labelText: "Name:"})

    const column2 = creator.labeledInput({id: "due-date", type: "date", required: false, labelText: "Due date:"})

    const column3 = creator.labeledSelect({id: "priority", required: true, labelText: "Priority:", priorities: ["low", "medium", "high"]})

    const button = createElement("button");
    button.innerText = "Add Todo";

    appendTo(form, title, column1, column2, column3, button);
    appendTo(dialog, form);
    appendTo(contentDiv, dialog);

    pubsub.emmit("todoDialogCreated", {
        button, 
        inputName: column1.querySelector("input"), 
        inputDate: column2.querySelector("input"), 
        inputPriority: column3.querySelector("select")});
}

function showProjectDialog() {
    Array.from(contentDiv.children).find(element => element.className == "project-dialog").showModal();
}

function showTodoDialog() {
    Array.from(contentDiv.children).find(element => element.className == "todo-dialog").showModal();
}