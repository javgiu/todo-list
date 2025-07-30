import Todo, {validatePriority} from "./todos"
import pubsub from "./PubSub";
import { storage, getFromStorage } from "./storage-manager";

pubsub.on("backToProjects", () => {
    pubsub.emmit("projectsUpdated", projects)
})
pubsub.on("selectedTodoFotEdit", selectTodo);
pubsub.on("editTodo", updateTodo);
pubsub.on("createNewProjectRequested", createNewProject);
pubsub.on("deleteProject", deleteProject);
pubsub.on("createNewTodoRequested", createNewTodo);
pubsub.on("deleteTodo", deleteTodo);
pubsub.on("requestProject", (projectIndex) => {
    pubsub.emmit("showProject", {
        project: projects[projectIndex],
        projectIndex
    })
    expandedProjectIndex = projectIndex;
});

class Project {
    constructor(title, dueDate = "") {
        this.title = title;
        this.dueDate = dueDate;
        this.todos = [];
    }
}

const projects = [];

let expandedProjectIndex = 0;
let todoSelectedForEdit = null;

// Add default Project

const defaultProject = new Project("Default Project");

const highTodo = new Todo("High priority todo", 1);
const mediumTodo = new Todo("Medium priority todo", 2);
const lowTodo = new Todo("Low priority todo", 3);

fillProject(defaultProject, [highTodo, mediumTodo, lowTodo]);

fillProjects(defaultProject);

// Sort todos

projects.forEach(project => {
    sortTodosByPriority(project);
});

// // Functions // //

function selectTodo(todoIndex) {
    todoSelectedForEdit = todoIndex;
    pubsub.emmit("showNewTodoDialog", { func: "data-edit-todo", todo: projects[expandedProjectIndex].todos[todoSelectedForEdit] });

}

// Create project function

function createNewProject(title) {
    const newProject = new Project(title)
    projects.push(newProject);
    pubsub.emmit("projectsUpdated", projects)
}

// Delete project function

function deleteProject(index) {
    projects.splice(index, 1);
    pubsub.emmit("projectsUpdated", projects);
}

// Create new Todo

function createNewTodo({ title, dueDate, priority, description }) {
    const project = projects[expandedProjectIndex];
    const todo = new Todo(title, priority, dueDate, description);
    project.todos.push(todo);
    sortTodosByPriority(project);
    pubsub.emmit("projectsUpdated", projects);

    // Refresh display to show new Todo added
    pubsub.emmit("showProject", {
        project,
        projectIndex: expandedProjectIndex
    });
}

// Delete todo using todo & project indexes

function deleteTodo({ todoIndex, projectIndex }) {
    projects[projectIndex].todos.splice(todoIndex, 1);
    pubsub.emmit("projectsUpdated", projects);

    pubsub.emmit("showProject", {
        project: projects[projectIndex],
        projectIndex
    });
}

// Working on update or edit todo

function updateTodo({title = "New Todo", dueDate = new Date(), priority = 3,  description = "Add Description"}) {
    const project = projects[expandedProjectIndex];
    const todo = project.todos[todoSelectedForEdit];
    todo.title = title;
    todo.dueDate = dueDate;
    todo.priority = validatePriority(priority);
    todo.description = description;

    sortTodosByPriority(project);

    pubsub.emmit("projectsUpdated", projects);

    // Refresh display to show new Todo added
    pubsub.emmit("showProject", {
        project,
        projectIndex: expandedProjectIndex
    });
}

// Fill project

function fillProject(project = new Project(), todosArray = []) {
    console.log(todosArray);
    todosArray.forEach(todo => project.todos.push(todo));
}

// Sort todos in project

function sortTodosByPriority(project) {
    project.todos.sort((aTodo, bTodo) => aTodo.priority - bTodo.priority);
}

// Fill projects array

function fillProjects(...projectsArray) {
    // if exists projects in storage get projects from storage
    if(getFromStorage("projects")) {
        projects.push(...getFromStorage("projects")); // if not use ... pass an array with the object in array[0]
        return;
    }
    // else push default project
    projectsArray.forEach(project => projects.push(project));
    storage({ key: "projects", data: projects });
}

export { projects };

