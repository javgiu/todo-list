import { contentDiv } from "./library.js";
import { createElement, appendTo } from "./library.js";

class Item {
    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.element = createElement
            ("div",
            "menu-item",
            `<p class='item-name'>${this.name}</p>
            <p class='item-description'>${this.description}</p>
            <p class='item-price'>$${this.price}</p>`
            );
    }
}

class Header {

    constructor(name) {
        this.element = createElement("h3", "menu-section", `<p class='menu-header'>${name}</p>`);
        this.headerName = name;
        this.items = [];
    }

    addItem(name, description, price) {
        this.items.push(new Item(name, description, price));
    }
}

function displayMenu() {
    menu.forEach(header => {
        appendTo(menuDiv, header.element);
        header.items.forEach(item => {
            appendTo(header.element, item.element);
        })
    });
};

function fillMenu() {
    menu.push(entrees);
    menu.push(main);
    menu.push(desserts);
}

function fillHeaders() {
    entrees.addItem("Tostones rellenos", "Delicios fried platain filled with beacon, cheese and mayonnaise", 10);
    main.addItem("Pork Masitas", "Fried pork in his own shortening with lemon and moroz rice", 25);
    desserts.addItem("Flan", "Made with eggs, condensed milk and evaporated milk", 12);

}

const menuTitle = createElement("h2", "title", "Menu");

const menuDiv = createElement("div", "menu");

const menu = [];

const entrees = new Header("Entrees");
const main = new Header("Main");
const desserts = new Header("Desserts");

fillHeaders();
fillMenu();
displayMenu();

export default function Menu() {
    appendTo(contentDiv, menuTitle, menuDiv);

}