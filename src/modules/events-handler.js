import pubsub from "./PubSub";

const navMenu = document.querySelector("nav");
const addProjectButton = navMenu.lastElementChild;

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

addProjectButton.addEventListener("click", () => {
    pubsub.emmit("showNewProjectDialog")
});

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
            default:
                console.dir(button.dataset.id);
                break;
            }
        }
        
    }));    
};
