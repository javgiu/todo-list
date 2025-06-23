import portada from "./assets/pictures/portada.jpg";

import rice from "./assets/pictures/arroz-con-leche.jpg";

import coffee from "./assets/pictures/coffe.jpg";

import pork from "./assets/pictures/pork-chops.jpg";

import { contentDiv, appendTo, createElement } from "./library.js";

function fillGridContainer(images, imagesDescriptions) {

    const container = createElement("div", "grid-container");

    for(let i = 0; i < 2; i++) {
        const image = createElement("img");

        image.src = images[i];

        const imageDescription = createElement("p");

        imageDescription.innerText = imagesDescriptions[i];

        if(i === 0) {
            image.className = "horizontal";
            imageDescription.className = "horizontal-description";
        } else {
            image.className = "vertical";
            imageDescription.className = "vertical-description";
        }

        container.appendChild(image);
        container.appendChild(imageDescription);

        portrait.appendChild(container);
    };
};

const mainPageTitle = "In Picallo's We Enjoy Make You Happy";

const portrait = createElement("div", "portrait");

const title  = createElement("h2","title", mainPageTitle);

fillGridContainer([portada, coffee], ["Portada description", "Coffee Description"]);

fillGridContainer([pork, rice], ["Pork Description", "Rice Description"]);


export default function PageLoad() {

    contentDiv.appendChild(title);
    contentDiv.appendChild(portrait);

};

