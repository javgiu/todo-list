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
        if(!props.class) props.class = "";
        const container = createElement("div", `flex-column-group ${props.class}`);
        const label = document.createElement("label");
        label.setAttribute("for", props.id)
        label.innerText = props.labelText;

        const input = document.createElement("input");
        input.setAttribute("placeholder", "Todo Title");
        input.setAttribute("required", props.required);
        input.setAttribute("id", props.id);
        input.setAttribute("type", props.type);
        input.value = props.value;
        if(props.type == "date") {
            input.valueAsDate = props.value;
        }

        appendTo(container, label, input);
        return container;
    },

    labeledSelect({name, id, labelText, options = 3, priorities, value}) {
        if(!name) name = "";
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
            if(i + 1 == value) {
                option.selected = true;
            }
            appendTo(select, option);
        }
        
        appendTo(container, label, select);
        return container;
    }
} 

export function create( container = {} ) {
    const parentElement = createElement(container.tagName, container.className);

    const childrenElements = [];

    const { children } = container;

    if(children.label) {
        const label = createLabel(children.label);
        childrenElements.push(label);
    }
    if(children.textarea) {
        const textarea = createTextarea(children.textarea);
        childrenElements.push(textarea);
    }
    if(children.input) {
        const input = createInput(children.input);
        childrenElements.push(input);
    }
    if(children.select) {
        const select = createSelect(children.select);
        childrenElements.push(select);
    }
    
    childrenElements.forEach(child => appendTo(parentElement, child));

    return parentElement;
}

function createInput({ required, id, type }) {
    const input = document.createElement("input");
    input.setAttribute("placeholder", "Todo Title");
    input.setAttribute("required", required);
    input.setAttribute("id", id);
    input.setAttribute("type", type);
    return input;
}

function createSelect({ id, options, values }) {
    const select = document.createElement("select");
    select.setAttribute("id", id);
    for(let i = 0; i < options; i++) {
        const option = document.createElement("option");
        option.innerText = values[i];
        option.setAttribute("value", values[i]);
    }
    return select;
}

function createLabel({ id, labelText }) {
    const label = document.createElement("label");
    label.setAttribute("for", id)
    label.innerText = labelText;
    return label;
}

function createTextarea({ id, cols, rows, value }) {
    const textarea = document.createElement("textarea");
    textarea.setAttribute("id", id);
    textarea.setAttribute("cols", cols);
    textarea.setAttribute("rows", rows);
    textarea.value = value;
    return textarea;
}