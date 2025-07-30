import { appendTo, createElement, creator, create } from "../libraries/DOM";
import plus from "../assets/icons/plus.svg";
import deleteIcon from "../assets/icons/delete.svg";
import pencil from "../assets/icons/pencil.svg";
import trash from "../assets/icons/trash.svg";
import menu from "../assets/icons/menu.svg";
import back from "../assets/icons/arrow-left.svg";
import pubsub from "./PubSub";
import closeIcon from "../assets/icons/close.svg";
import { format } from "date-fns";

const actionButton = document.querySelector(".action-button");
const menuIcon = menu;
const pencilIcon = pencil;
const trashIcon = trash;
const plusIcon = plus;
const deleteSvg = deleteIcon;
const backIcon = back;
const contentDiv = document.querySelector("#content");
const closeSvg = closeIcon

pubsub.on("projectsUpdated", projectsView);
pubsub.on("showNewProjectDialog", showProjectDialog)
pubsub.on("showNewTodoDialog", createTodoDialog);
pubsub.on("showProject", singleProjectView);
pubsub.on("expandTodo", expandTodoElement);

export default function projectsView(projects) {
    
    cleanContentDiv();

    actionButton.innerHTML = plusIcon;
    for (const attr of Array.from(actionButton.attributes)) {
        if(attr.name.startsWith("data-")) {
            actionButton.removeAttribute(attr.name);
        }
    }
    actionButton.setAttribute("data-add-project", "");

    projects.forEach(project => {

        const projectElement = createElement("div","project");
        projectElement.setAttribute("data-project", "");
        const header = createElement("div", "project-header");
        const title = createElement("h2", "project-title", project.title);
        const deleteProjectButton = createElement("button", "delete-project-button");
        deleteProjectButton.innerHTML = deleteSvg;
        deleteProjectButton.setAttribute("data-delete-project", "");
        deleteProjectButton.dataset.index = projects.indexOf(project);

        appendTo(header, title, deleteProjectButton);
        appendTo(projectElement, header);

        projectElement.dataset.id = projects.indexOf(project);

        const todoElements = createTodosElement(project.todos);

        appendTo(projectElement, todoElements);

        appendTo(contentDiv, projectElement);
    });

    createProjectDialog();
}

function createTodosElement(todos) {
    const todosElement = createElement("div", "todos");

    todos.forEach((todo, index) => {
        const todoElement = createElement("div", "todo");

        todoElement.dataset.id = index;
        const todoTitle = createElement("h3", "todo-title", todo.title);

        const todoCheckbox = createElement("input", "checkbox");

        todoCheckbox.setAttribute("type", "checkbox");

        appendTo(todoElement, todoCheckbox, todoTitle);

        appendTo(todosElement, todoElement);
    });
    
    return todosElement;
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
    button.setAttribute("data-create-project", "");
    button.innerText = "Add Project";

    appendTo(form, input, button);
    appendTo(dialog, form)
    appendTo(contentDiv, dialog)
}

function singleProjectView({project, projectIndex}) {

    cleanContentDiv();

    actionButton.innerHTML = backIcon;
    for (const attr of Array.from(actionButton.attributes)) {
        if(/^data-.*project/.test(attr.name)) {
            actionButton.removeAttribute(attr.name);
        }
    }
    actionButton.setAttribute("data-return", "");


    const projectElement = createElement("div","expanded-project");

    const header = createElement("div", "project-header");
    const title = createElement("h2", "project-title", project.title);

    appendTo(header, title);
    appendTo(projectElement, header);

    projectElement.dataset.id = projectIndex;

    const todosDiv = createElement("div", "todos");

    const todoElements = project.todos.map(createTodoElement);

    todoElements.forEach(todoElement => appendTo(todosDiv, todoElement));

    appendTo(projectElement, todosDiv);

    addAddTodoButton(projectElement);

    appendTo(contentDiv, projectElement)
}

function addAddTodoButton(parent) {
    const button = createElement("button", "add-todo-button");

    button.innerHTML = plusIcon;

    button.setAttribute("data-add-todo", "");

    appendTo(parent, button);
}

function createTodoElement(todo, index) {
    const todoElement = createElement("div", "todo")

    todoElement.dataset.id = index;
    const todoTitle = createElement("div", "todo-title");

    const todoCheckbox = createElement("input", "checkbox");

    todoCheckbox.setAttribute("type", "checkbox");

    const todoTitleText = createElement("h3", "", todo.title);

    appendTo(todoTitle, todoCheckbox, todoTitleText);

    const buttons = createTodoButtons();

    const properties = createTodoProperties(todo);

    appendTo(todoElement, todoTitle, buttons, properties);

    addPriorityClass(todoElement, todo.priority);
    
    return todoElement;
}

function addPriorityClass(element, priority) {
        switch(priority) {
        case 1:
            element.classList.add("high");
            break;
        case 2:
            element.classList.add("medium");
            break;
        case 3:
            element.classList.add("low");
            break;
        default:
            break;
    }
}

function createTodoProperties(todo) {
    const propertiesPanel = createElement("div", "todo-properties");

    const date = createElement("p", "todo-date");
    date.textContent = displayDate(todo.dueDate);

    const description = createElement("textarea", "todo-description");
    description.value = todo.description;
    description.setAttribute("readonly", true);

    appendTo(propertiesPanel, date, description);

    return propertiesPanel;
}

function createTodoButtons() {
    const buttons = createElement("div", "todo-buttons");

    const deleteButton = createElement("button", "delete-todo-button");
    deleteButton.innerHTML = trashIcon;
    deleteButton.setAttribute("data-delete-todo", "");

    const editButton = createElement("button", "edit-todo-button");
    editButton.innerHTML = pencilIcon;
    editButton.setAttribute("edit-todo-button", "");

    const menuButton = createElement("button", "expand-todo-button");
    menuButton.innerHTML = menuIcon;
    menuButton.setAttribute("expand-todo-button", "");

    appendTo(buttons, editButton, deleteButton, menuButton);

    return buttons;
}

function createTodoDialog({ func, todo }) {

    if(document.querySelector(".todo-dialog")) {
        contentDiv.removeChild(document.querySelector(".todo-dialog"));
    };

    let titleText = "New Todo";
    console.log(todo.title);

    let todoTitle = "";
    let todoDate = "";
    let todoPriority = "";
    let todoDescription = "";

    if(func == "data-edit-todo") {
        titleText = "Edit Todo";
    }

    if(todo) {
        todoTitle = todo.title;
        todoDate = todo.dueDate;
        todoPriority = todo.priority;
        todoDescription = todo.description;
    }

    const dialog = createElement("dialog", "todo-dialog");
    dialog.setAttribute("closedBy", "any");

    const form = createElement("form");
    form.setAttribute("method", "dialog");

    const title = createElement("h3", "form-title", titleText);

    const column1 = creator.labeledInput({
        id: "name", 
        type: "text", 
        required: true, 
        labelText: "Name:",
        value: todo.title
    })

    console.log(format(todoDate, "MM/dd/yyyy"))

    const column2 = creator.labeledInput({
        id: "due-date", 
        type: "date", 
        required: false, 
        labelText: "Due date:",
        value: new Date(todoDate)
    })

    const column3 = create({
        tagName: "div",
        className: "flex-column-group",
        children: {
            label: {
                id: "description",
                labelText: "Description",
            },
            textarea: {
                id: "description",
                cols: 50,
                rows: 7,
                value: todoDescription
            }
        }
    })

    const column4 = creator.labeledSelect({
        id: "priority", 
        required: true, 
        labelText: "Priority:", 
        priorities: ["high", "medium", "low"],
        value: todoPriority
    })

    const button = createElement("button");
    button.setAttribute(func, "");
    button.innerText = "Add Todo";

    appendTo(form, title, column1, column2, column3, column4, button);
    appendTo(dialog, form);
    appendTo(contentDiv, dialog);

    showTodoDialog(dialog);
}

function showProjectDialog() {
    Array.from(contentDiv.children).find(element => element.className == "project-dialog").showModal();
}

function showTodoDialog(dialog) {
   dialog.showModal();
}

function displayDate(date) {
    if (date == "") {
        return format(new Date(), "eee MMM/dd/yyyy");
    } else {
        return format(date, "eee MMM/dd/yyyy");
    }
}

function cleanContentDiv() {

    if(contentDiv.innerHTML !== "") {
        contentDiv.innerHTML = "";
    }
}

function expandTodoElement({ button, todoElement}) {
    changeTodoClassAndButtonSVG(button, todoElement);

}

function changeTodoClassAndButtonSVG(button, todo) {
        if(todo.classList.contains("expanded")) {
        todo.classList.remove("expanded");
        button.innerHTML = menuIcon;
    } else {
        todo.classList.add("expanded");
        button.innerHTML = closeSvg;
    }  
}