import { add } from "date-fns";
import pubsub from "./PubSub";

function addGlobalEvent(eventName, elementSelector, callback, currentListener = document, options = {}) {

    const { useClosest = false, exceptions = null } = options;

    currentListener.addEventListener(eventName, (e) => {

        if (exceptions && exceptions.includes(e.target.nodeName)) return;

        let targetElement = null;

        if (useClosest) {
            targetElement = e.target.closest(elementSelector);
        } else if (e.target.matches(elementSelector)) {
            targetElement = e.target;
        }

        if (targetElement && currentListener.contains(targetElement)) {
            callback(e, targetElement);
        }
    })
}

// Project Div Event
addGlobalEvent(
    "click",
    "[data-project]",
    (e, project) => {
        pubsub.emmit("requestProject", project.dataset.id);
    },
    document,
    { useClosest: true, exceptions: ["BUTTON"] }
);

// Add Project Button Event
addGlobalEvent(
    "click",
    "[data-add-project]",
    (e) => {
        pubsub.emmit("showNewProjectDialog");
    }
);

// Delete Project Button Event
addGlobalEvent(
    "click",
    "[data-delete-project]",
    (e) => {
        pubsub.emmit("deleteProject", e.target.dataset.index)
    }
);

// Return Button Event
addGlobalEvent(
    "click",
    "[data-return]",
    (e) => {
        pubsub.emmit("backToProjects");
    }
);

// Delete Todo Button Event
addGlobalEvent(
    "click",
    "[data-delete-todo]",
    (e) => {
        pubsub.emmit("deleteTodo", {
            todoIndex: e.target.closest(".todo").dataset.id, 
            projectIndex: e.target.closest(".expanded-project").dataset.id 
        })
    }
);

// Add Todo Button Event
addGlobalEvent(
    "click",
    "[data-add-todo]",
    (e) => {
        pubsub.emmit("showNewTodoDialog", { func: "data-create-todo" });
    }
);

// Create Project Button on Dialog Event
addGlobalEvent(
    "click",
    "[data-create-project]",
    (e) => {
        const input = e.target.previousSibling;
        const projectName = input.value;
        pubsub.emmit("createNewProjectRequested", projectName);
    }
);

// Todo Dialog Button Event
addGlobalEvent(
    "click",
    "[data-create-todo]",
    (e) => {
        const formElement = e.target.parentElement;
        const name = formElement.querySelector("#name");
        const date = formElement.querySelector("#due-date");
        const priority = formElement.querySelector("#priority");
        const description = formElement.querySelector("#description");

        pubsub.emmit("createNewTodoRequested", {
            title: name.value,
            dueDate: date.value,
            priority: priority.value,
            description: description.value 
        });
    }
)

addGlobalEvent(
    "click",
    "[expand-todo-button]",
    (e, button) => {
        const todoElement = button.parentElement.parentElement;
        pubsub.emmit("expandTodo", { button, todoElement });
    }
);

// Edit todo button event

addGlobalEvent(
    "click",
    "[edit-todo-button]",
    (e, button) => {
        pubsub.emmit("selectedTodoFotEdit", button.parentElement.parentElement.dataset.id);
    }
);

// Todo dialog button event for edit todo

addGlobalEvent(
    "click",
    "[data-edit-todo]",
    (e, button) => {
        const formElement = e.target.parentElement;
        const name = formElement.querySelector("#name");
        const date = formElement.querySelector("#due-date");
        const priority = formElement.querySelector("#priority");
        const description = formElement.querySelector("#description");

        pubsub.emmit("editTodo", {
            title: name.value,
            dueDate: date.value,
            priority: priority.value,
            description: description.value 
        });
    }
);