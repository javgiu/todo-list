import pubsub from "./PubSub";

function addGlobalEvent(eventName, elementSelector, callback, parent = document) {
    parent.addEventListener(eventName, (e) => {
        if(e.target.matches(elementSelector)) {
            callback(e);
        }
    })
}

addGlobalEvent(
    "click",
    "[data-add-project]",
    (e) => {
        pubsub.emmit("showNewProjectDialog");
    }
);

addGlobalEvent(
    "click",
    "[data-return]",
    (e) => {
        pubsub.emmit("backToProjects");
    }
);

addGlobalEvent(
    "click",
    "[data-delete-todo]",
    (e) => {
        pubsub.emmit("deleteTodo", {
            todoIndex: e.target.closest(".todo").dataset.id, 
            projectIndex: e.target.closest(".expanded-project").dataset.id 
        })
    }
)

pubsub.on("projectsDisplayed", addProjectEvents);
pubsub.on("todoDialogCreated", ({
    button, 
    inputName, 
    inputDate, 
    inputPriority}) => {
        button.addEventListener("click", () => {
            pubsub.emmit("updateNewTodo", {
                title: inputName.value, 
                dueDate: inputDate.value, 
                priority: inputPriority.value
            });
        });
});

pubsub.on("projectDialogCreated", ({ button, input }) => {
    button.addEventListener("click", ()=> {
        pubsub.emmit("createNewProjectRequested", input.value)
    })
})

function addProjectEvents(projects) {
    projects.forEach((project) => project.addEventListener("click", (e) => {
        if(e.target.closest("button")) {
            const button = e.target.closest("button");
            switch(button.dataset.id) {
            case "delete-project-button":
                pubsub.emmit("deleteProject", button.dataset.index)
                break;
            case "add-todo-button":
                pubsub.emmit("showNewTodoDialog");
                pubsub.emmit("createNewTodo", button.parentElement.dataset.id);
                break;
            case "delete-todo-button":
                pubsub.emmit("deleteTodo", {
                    todo: button.closest(".todo").dataset.id, 
                    project: button.closest(".project").dataset.id 
                });
                break; 
            case "edit-todo-button": 
                break; 
            case "expand-todo-button": 
                break; 
            default:
                break;
            }
        } else if(e.target.nodeName == "INPUT") {
            return;
        } else {
            pubsub.emmit("requestProject", project.dataset.id);
        }
        
    }));    
};
