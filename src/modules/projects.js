import Todo from "./todos"
import pubsub from "./PubSub";

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


const projects = [];

let expandedProjectIndex = 0;

pubsub.on("backToProjects", () => {
    pubsub.emmit("projectsUpdated", projects)
})
pubsub.on("createNewProjectRequested", createNewProject);
pubsub.on("deleteProject", deleteProject);
pubsub.on("createNewTodoRequested", createNewTodo);
pubsub.on("deleteTodo", deleteTodo);

// Working here

pubsub.on("requestProject", (projectIndex) => {
    pubsub.emmit("showProject", {
        project: projects[projectIndex],
        projectIndex
    })
    expandedProjectIndex = projectIndex;
});


function fillProjects(...projectsArray) {
    projectsArray.forEach(project => projects.push(project));
}


const project1 = new Project("Logo suegrita");
const project2 = new Project("Do It Project");
const project3 = new Project("Business Meeting");

const l1 = new Todo("Hacer logo de mi suegra", 3);
const l2 = new Todo("Aprender mas Krita", 1);
const l3 = new Todo("Terminar retrato del Nicholas", 2);

project1.fill(l1,l2,l3);

fillProjects(project1, project2, project3);

// Sort todos

projects.forEach(project => project.sortTodosByPriority());

// Create new project

function createNewProject(title) {
    const newProject = new Project(title)
    projects.push(newProject)
    pubsub.emmit("projectsUpdated", projects)
}

function deleteProject(index) {
    projects.splice(index, 1);
    pubsub.emmit("projectsUpdated", projects);
}

// Work here

function createNewTodo({title, dueDate, priority}) {

    const project = projects[expandedProjectIndex];
    const todo = new Todo();
    todo.update(title, dueDate, priority);
    project.todos.push(todo);
    project.sortTodosByPriority();

    pubsub.emmit("showProject", {
        project,
        projectIndex: expandedProjectIndex
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