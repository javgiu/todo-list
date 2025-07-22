import Todo from "./todos"
import pubsub from "./PubSub";

const projects = [];

let onProject = 0;

pubsub.on("backToProjects", () => {
    pubsub.emmit("projectsUpdated", projects)
})
pubsub.on("createNewProjectRequested", createNewProject);
pubsub.on("deleteProject", deleteProject);
pubsub.on("createNewTodo", addNewTodo);
pubsub.on("updateNewTodo", updateNewTodo);
pubsub.on("deleteTodo", deleteTodo);
pubsub.on("requestProject", (projectIndex) => pubsub.emmit("showProject", {
    project: projects[projectIndex],
    projectIndex
}));


function fillProjects(...projectsArray) {
        projectsArray.forEach(project => projects.push(project));
    }

class Project {
    constructor(title, dueDate = "") {
        this.title = title;
        this.dueDate = dueDate;
        this.todos = [];
    }

    sortTodosByPriority() {
        this.todos.sort((aTodo, bTodo) => aTodo.priority - bTodo.priority);
}

    fill(...todosArray) {
        todosArray.forEach(todo => this.todos.push(todo));
    }
}

const project1 = new Project("Logo suegrita");
const project2 = new Project("Do It Project");
const project3 = new Project("Business Meeting");

const l1 = new Todo("Hacer logo de mi suegra");
const l2 = new Todo("Aprender mas Krita", 1);
const l3 = new Todo("Terminar retrato del Nicholas", 2);

project1.fill(l1,l2,l3);

fillProjects(project1, project2, project3);

projects.forEach(project => project.sortTodosByPriority());

function createNewProject(title) {
    const newProject = new Project(title)
    projects.push(newProject)
    pubsub.emmit("projectsUpdated", projects)
}

function deleteProject(index) {
    projects.splice(index, 1);
    pubsub.emmit("projectsUpdated", projects);
}

function addNewTodo(projectIndex) {
    projects[projectIndex].todos.push(new Todo("Nueva tarea"));
    onProject = projectIndex;
}

function updateNewTodo({title, dueDate, priority}) {
    console.log(title, dueDate, priority);
    const project = projects[onProject];
    const todos = project.todos;
    const todo = todos[todos.length - 1];
    todo.update(title, dueDate, priority);
    projects.forEach(project => project.sortTodosByPriority());
    console.log(projects);

    pubsub.emmit("showProject", {
        project,
        projectIndex: onProject
    });
}

function deleteTodo({todoIndex, projectIndex}) {
    projects[projectIndex].todos.splice(todoIndex, 1);
    pubsub.emmit("showProject", {
        project: projects[projectIndex],
        projectIndex
    });
}

export { projects };