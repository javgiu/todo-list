export function createElement(tagName = "div", className = "", content = "") {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerHTML = content;
    return element;
}

export function appendTo(father, ...children) {
    children.forEach(child => {
        father.appendChild(child);
    });
};

export const creator = {
    labeledInput(props) {
        const container = createElement("div", `flex-column-group`);
        const label = document.createElement("label");
        label.setAttribute("for", props.id)
        label.innerText = props.labelText;

        const input = document.createElement("input");
        input.setAttribute("placeholder", "Todo Title");
        input.setAttribute("required", props.required);
        input.setAttribute("id", props.id);
        input.setAttribute("type", props.type);

        appendTo(container, label, input);
        return container;
    },

    labeledSelect({name, id, labelText, options = 3, priorities}) {
        const container = createElement("div", `flex-column-group ${name}`);
        const label = document.createElement("label");
        label.setAttribute("for", id)
        label.innerText = labelText;

        const select = document.createElement("select");
        select.setAttribute("id", id);
        for(let i = 0; i < options; i++) {
            const option = document.createElement("option");
            option.innerText = priorities[i];
            option.setAttribute("value", priorities[i]);
            appendTo(select, option);
        }
        
        appendTo(container, label, select);
        return container;
    }
} 