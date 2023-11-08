const button = document.createElement("button"); //add input button
button.textContent = "New grid";
document.body.appendChild(button);

const colourSelect = document.querySelector("#buttons");

const makeRGB = document.createElement("button");
makeRGB.textContent = "Spice it up!";
colourSelect.appendChild(makeRGB);

const makeBlack = document.createElement("button");
makeBlack.textContent = "Boo!";
colourSelect.appendChild(makeBlack);


// let user clear grid and add custom amount of pixels
button.addEventListener("click", () => {
    let squares = parseInt(prompt("How many squares do you want?"));

    if (!Number.isInteger(squares) || squares > 100) {
        alert("Sorry, I can't do that. Try again."); // error if over 100 pixels or not integer
    } else {
        while (container.firstChild) {
            container.removeChild(container.firstChild); // while container has firstChild (cells) then remove said cell
        }
        createGrid(squares); // create new grid with user inputted pixels
    }
});

const container = document.querySelector("#container");
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
//get width and height of container from CSS

document.addEventListener("DOMContentLoaded", createGrid(16)); // on load make 16x16 grid

function createGrid(x) {
    for (let rows = 0; rows < x; rows++) {
        //adds 16x16 grid
        for (let columns = 0; columns < x; columns++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.style.width = `${containerWidth / x}px`;
            cell.style.height = `${containerHeight / x}px`; // equal number of squares per row and column
            cell.style.border = "1px solid black";

            let r = Math.floor(Math.random() * 256); //creates rgb random starting values for each cell
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            let a = 0;

            let rgba = `rgba(${r},${g},${b},${a})`; //converts to rgba value from strings
            cell.style.backgroundColor = `${rgba}`; //sets rgba value

            cell.dataset.OGrgba = rgba; //stores original rgba value in dataset for later
            cell.dataset.rgba = rgba; // stores current rgba value in dataset
            cell.dataset.opacity = 0; //stores opacity in dataset

            cell.addEventListener("mouseover", darken); // on hover, activate darken function

            container.appendChild(cell);
        }
    }
}

function darken(event) {
    let cell = event.target;

    let newOpacity = parseFloat(cell.dataset.opacity) + 0.1; // gets opacity from dataset. parseFloat needed due to datasets being strings. Increments by 10%
    if (newOpacity > 1) newOpacity = 1; // ensure opacity does not exceed 100%

    let newRGBA = (cell.dataset.rgba).replace(/\d+(\.\d+)?(?=\))/, newOpacity.toFixed(1)); 
    // gets rgba from dataset, parseFloat not needed as we use string methods. 
    // uses regular expression to search. searches for digit, (optionally) followed by decimal point and then 1 or more digits (eg 0.5), and then followed by closing brackets. This makes sure to select the alpha value. converts newOpacity from float to string and replaces. 

    cell.style.backgroundColor = newRGBA; // update CSS with darkened rgba value
    cell.dataset.rgba = newRGBA; // updates rgba dataset
    cell.dataset.opacity = newOpacity; // updates opacity dataset
}

makeRGB.addEventListener("click", () => {
    const cells = document.querySelectorAll(".cell");  

    cells.forEach((cell) => {
        let currentOpacity = parseFloat(cell.dataset.opacity);
        let newRGBA = cell.dataset.OGrgba; // gets original assigned rgba value

        newRGBA = newRGBA.replace(/\d+(\.\d+)?(?=\))/, currentOpacity); // resets to original value, just keeping opacity

        cell.style.backgroundColor = newRGBA;
        cell.dataset.rgba = newRGBA; 
    });
});

makeBlack.addEventListener("click", () => {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        let currentOpacity = parseFloat(cell.dataset.opacity);
        let newRGBA = `rgba(0,0,0,${currentOpacity})`; // changes to greyscale, just keeping opacity

        cell.style.backgroundColor = newRGBA;
        cell.dataset.rgba = newRGBA;
    });
});
