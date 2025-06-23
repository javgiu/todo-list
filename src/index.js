import "./styles.css";
import { contentDiv } from "./library.js";
import home from "./home.js";
import menu from "./menu.js";
import contact from "./contact-us.js";

const buttons = document.querySelectorAll(".navigation-button");

home();

buttons.forEach(button => button.addEventListener("click", refresh));



function refresh(e) {

    buttons.forEach(button => {
        if(button.classList.contains("active")) {
            button.classList.remove("active");
        };
    });

    contentDiv.innerHTML = "";

    const buttonName = e.target.classList[1];

    switch(buttonName) {
        case "home-button":
            home();
            e.target.classList.add("active");
            break;
        case "menu-button":
            menu();
            e.target.classList.add("active");
            break;
        case "contact-us-button":
            contact();
            e.target.classList.add("active");
            break;
        default:
            return;
    }
};


