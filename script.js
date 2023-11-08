const button = document.createElement("button"); //add input button
button.textContent = "New grid";
document.body.appendChild(button);

button.addEventListener("click", () => {
    // let user clear grid and add custom amount of pixels
    let squares = parseInt(prompt("How many squares do you want?"));

    if (!Number.isInteger(squares) || squares > 100) {
        alert("Sorry, I can't do that. Try again.");
        // error if over 100 pixels or not integer
    } else {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
            // while container has firstChild (cells) then remove said cell
        }
        createGrid(squares); // create new grid with user inputted pixels
    }
});

const container = document.querySelector("#container");
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
//get width and height of container from CSS

createGrid(16); // on load make 16x16 grid

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

            cell.dataset.rgba = rgba; //stores rgba value in dataset
            cell.dataset.opacity = 0; //stores opacity in dataset

            cell.addEventListener("mouseover", darken); // on hover, activate darken function

            container.appendChild(cell);
        }
    }
}

function darken(event) {
    let cell = event.target;
    let currentOpacity = parseFloat(cell.dataset.opacity); // gets opacity from dataset and stores in new variable. parseFloat needed due to datasets being strings
    let newOpacity = currentOpacity + 0.1;  // opacity incremented by 0.1 10%
    let newRGBA = cell.dataset.rgba;    // gets rgba from dataset and stores in new variable. parseFloat not needed as we use string methods 

    newRGBA = newRGBA.replace(currentOpacity, newOpacity);  // converts opacity values from floats to strings and replaces old opacity value to new one

    cell.style.backgroundColor = newRGBA;   // update CSS with darkened rgba value
    cell.dataset.opacity = newOpacity;  // updates opacity dataset
    cell.dataset.rgba = newRGBA;    // updates rgba dataset
}

