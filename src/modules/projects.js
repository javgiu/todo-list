import Todo, { updateTodo } from "./todos"
import pubsub from "./PubSub";
import { storage, getFromStorage } from "./storage-manager";

pubsub.on("backToProjects", () => {
    pubsub.emmit("projectsUpdated", projects)
})
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

const project1 = new Project("Logo suegrita");
const project2 = new Project("Do It Project");
const project3 = new Project("Business Meeting");

const l1 = new Todo("Hacer logo de mi suegra", 3);
const l2 = new Todo("Aprender mas Krita", 1);
const l3 = new Todo("Terminar retrato del Nicholas", 2);

fillProject(project1,l1,l2,l3);

fillProjects(project1, project2, project3);

// Sort todos

projects.forEach(project => {
    sortTodosByPriority(project);
});

// Create new project

function createNewProject(title) {
    const newProject = new Project(title)
    projects.push(newProject);
    pubsub.emmit("projectsUpdated", projects)
}

function deleteProject(index) {
    projects.splice(index, 1);
    pubsub.emmit("projectsUpdated", projects);
}

function createNewTodo({title, dueDate, priority}) {
    const project = projects[expandedProjectIndex];
    const todo = new Todo();
    updateTodo(todo, { title, dueDate, priority });
    project.todos.push(todo);
    sortTodosByPriority(project);
    pubsub.emmit("projectsUpdated", projects);

    pubsub.emmit("showProject", {
        project,
        projectIndex: expandedProjectIndex
    });

}

function deleteTodo({todoIndex, projectIndex}) {
    projects[projectIndex].todos.splice(todoIndex, 1);
    pubsub.emmit("projectsUpdated", projects);

    pubsub.emmit("showProject", {
        project: projects[projectIndex],
        projectIndex
    });
}

function fillProject(project, ...todosArray) {
    todosArray.forEach(todo => project.todos.push(todo));
}

function sortTodosByPriority(project) {
    project.todos.sort((aTodo, bTodo) => aTodo.priority - bTodo.priority);
}

function fillProjects(...projectsArray) {
    if(getFromStorage("projects")) {
        projects.push(...getFromStorage("projects"));
        console.log(projects, "Getting projects from storage");
        return;
    }

    projectsArray.forEach(project => projects.push(project));
    storage({ key: "projects", data: projects });
}

export { projects };

