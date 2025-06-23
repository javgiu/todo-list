import { appendTo, createElement } from "./library.js";
import { contentDiv } from "./library.js";

function createCard(type, info) {
    const container = createElement("div", "contact-card");
    const title = createElement("h3", "contact-title", type);
    const text = createElement("p", "contact-info", info);
    appendTo(container, title, text);
    return container;
}

function fillContactDiv() {
    cards.forEach(card => {
        appendTo(contactDiv, card)
    });
};

function populateCards() {
    cards.push(email);
    cards.push(phone);
    cards.push(address);
}

const email = createCard("Email:", "javypicallo@gmail.com");
const phone = createCard("Phone:", "+1 (111)-111-1111");
const address = createCard("Address:", "575 Concord Rd, Gainesville, Fl, 00112");



const cards = [];

const contactDiv = createElement("div", "contact-div");

populateCards();
fillContactDiv();

const title = createElement("h2", "title", "Contact Us");

export default function Contacts() {
    appendTo(contentDiv, title, contactDiv);
}