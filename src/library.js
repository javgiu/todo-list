export function createElement(tagName = "div", className = "", content = "") {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerHTML = content;

    return element;
}

export function appendTo(father, ...childs) {
    childs.forEach(child => {
        father.appendChild(child);
    });
};

export const contentDiv = document.querySelector("#content");