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

document.addEventListener("load", createGrid(16)); // on load make 16x16 grid

function createGrid(x) {
    for (let rows = 0; rows < x; rows++) {
        //adds 16x16 grid
        for (let columns = 0; columns < x; columns++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.style.width = `${containerWidth / x}px`;
            cell.style.height = `${containerHeight / x}px`; 
            // equal number of squares per row and column
            cell.style.border = "1px solid black";

            cell.addEventListener("mouseover", () => {
                cell.style.backgroundColor = "black";
            }); //on hover change to black

            container.appendChild(cell);
        }
    }
}

