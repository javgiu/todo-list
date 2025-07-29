import pubsub from "./PubSub";

export function storage(key, data) {
    console.log("Starting Storage");
    localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage(key) {
    const storedItem = localStorage.getItem(key);
    console.log("Starting Getting from Storage");

    if(storedItem) {
        const data = JSON.parse(storedItem);
        return data;
    } else {
        return storedItem;
    }
}

function storeProjects(projects) {
    console.log("Starting Projects Storage");
    localStorage.setItem("projects", JSON.stringify(projects));
}

pubsub.on("projectsUpdated", storeProjects)