const container = document.querySelector("#container");
const funky = document.querySelector("#funky-time");
const boring = document.querySelector("#party-pooper");
const newGrid = document.querySelector(".new-grid");

const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

function createGrid(cellCount) {
    for (let rows = 0; rows < cellCount; rows++) {
        for (let columns = 0; columns < cellCount; columns++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.style.width = `${containerWidth / cellCount}px`;
            cell.style.height = `${containerHeight / cellCount}px`;

            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);

            let rgba = `rgba(${r}, ${g}, ${b}, 0)`;
            cell.style.backgroundColor = rgba;

            cell.dataset.ogRGBA = rgba;
            cell.dataset.rgba = rgba;
            cell.dataset.opacity = 0;

            cell.addEventListener("mouseover", darken);

            container.appendChild(cell);
        }
    }
}

function darken(event) {
    const cell = event.target;

    let currentOpacity = parseFloat(cell.dataset.opacity);

    let newOpacity = (currentOpacity + 0.1).toFixed(1);
    if (newOpacity > 1) newOpacity = 1;

    let currentRGBA = cell.dataset.rgba;
    let newRGBA = currentRGBA.replace(/\d+(\.\d+)?(?=\))/, newOpacity);

    cell.style.backgroundColor = newRGBA;
    cell.dataset.opacity = newOpacity;
    cell.dataset.rgba = newRGBA;
}

function getFunky() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        let currentOpacity = parseFloat(cell.dataset.opacity);
        let ogRGBA = cell.dataset.ogRGBA;

        let newRGBA = ogRGBA.replace(/\d+(\.\d+)?(?=\))/, currentOpacity);

        cell.style.backgroundColor = newRGBA;
        cell.dataset.rgba = newRGBA;
    });
}

function beBoring() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        let currentOpacity = parseFloat(cell.dataset.opacity);

        let newRGBA = `rgba(0,0,0,${currentOpacity})`;

        cell.style.backgroundColor = newRGBA;
        cell.dataset.rgba = newRGBA;
    });
}

function reset() {
    let cellCount = parseInt(
        prompt(
            "How large do you want the grid to be? E.g. 64 will result in a 64x64 grid."
        )
    );

    if (!Number.isInteger(cellCount) || cellCount > 100) {
        alert("Sorry, I can't do that. Please try again!");
    } else {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        createGrid(cellCount);
    }
}

funky.addEventListener("click", getFunky);
boring.addEventListener("click", beBoring);
newGrid.addEventListener("click", reset);

createGrid(16);
