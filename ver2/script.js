const container = document.querySelector("#container");

const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

const reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
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
});

function createGrid(cellCount) {
    for (let rows = 0; rows < cellCount; rows++) {
        for (let columns = 0; columns < cellCount; columns++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.style.width = `${containerWidth / cellCount}px`;
            cell.style.height = `${containerHeight / cellCount}px`;

            cell.style.backgroundColor = `rgba(0,0,0,0)`
            cell.dataset.opacity = 0

            cell.addEventListener("mouseover", darken);

            container.appendChild(cell);
        }
    }
}

function darken(event) {
    const cell = event.target;
    
    let currentOpacity = parseFloat (cell.dataset.opacity)
    
    cell.style.backgroundColor = `rgba(0,0,0,${currentOpacity})`
    
    let newOpacity = (currentOpacity + 0.1).toFixed(1)
    cell.dataset.opacity = newOpacity
}

createGrid(16);
