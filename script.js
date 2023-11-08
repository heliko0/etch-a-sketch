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
            cell.style.height = `${containerHeight / x}px`;
            // equal number of squares per row and column
            cell.style.border = "1px solid black";
            cell.style.backgroundColor = "rgba (0,0,0,0)"
            cell.dataset.opacity = 0

            // cell.addEventListener("mouseover", () => {
            //     let r = Math.floor(Math.random() * 256);
            //     let g = Math.floor(Math.random() * 256);
            //     let b = Math.floor(Math.random() * 256);
            //     let a = 0.1;

            //     let rgba = `rgba(0,0,0,${a})`;

            //     cell.style.backgroundColor = `${rgba}`;
            // }); //on hover change to random colour

            cell.addEventListener("mouseover", darken);

            container.appendChild(cell);
        }
    }
}

function darken (event) {
    let cell = event.target;
    let currentOpacity = parseFloat(cell.dataset.opacity);
    currentOpacity += 0.1;
    cell.style.backgroundColor = `rgba(0,0,0,${currentOpacity})`;
    cell.dataset.opacity = currentOpacity;
    
}


// const cells = document.querySelectorAll(".cell");

// cells.forEach(cell => {
//     cell.addEventListener("mouseover", (event) => {
//         let style = window.getComputedStyle(event.target);
//         let currentColour = style.backgroundColor;
//         console.log(currentColour)

//         let currentOpacity = currentColour.slice()
//         currentOpacity += 0.1;

//         let rgba
//     })
// })