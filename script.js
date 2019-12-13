let gameLevel = null;
let numGridItems = null;
let gridItems = [];
let checkMatching = false;
let checking = false;
let matchedItem = null;
let numFlips = 0;
const data = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
  "I",
  "I"
];

const selecrDifficultyElm = document.getElementById("select-difficulty");
const gameGridElm = document.getElementById("game-grid");
const gridsElm = document.getElementById("grids");

gameGridElm.style.display = "none";

const setDifficulty = level => {
  gameLevel = level;
  switch (gameLevel) {
    case "Easy":
      numGridItems = 4;
      break;
    case "Medium":
      numGridItems = 8;
      break;
    case "Hard":
      numGridItems = 14;
      break;
  }
  selecrDifficultyElm.style.display = "none";
  gameGridElm.style.display = "block";
  makeGrids();
};

const makeGrids = () => {
  gridItems = [];
  checkMatching = false;
  checking = false;
  matchedItem = null;
  numFlips = 0;
  gridsElm.innerHTML = "";

  for (let i = 0; i < numGridItems; i++) {
    gridItems.push({
      name: data[i],
      isOpen: false,
      isMatched: false
    });
  }
  shuffleGrid();
  for (let i = 0; i < numGridItems; i++) {
    render(gridItems[i]);
  }
};

const shuffleGrid = () => {
  for (i = 0; i < numGridItems; i++) {
    const randomIndex = Math.floor(Math.random() * numGridItems);
    const temp = gridItems[i];
    gridItems[i] = gridItems[randomIndex];
    gridItems[randomIndex] = temp;
  }
};

const render = item => {
  const gridNode = document.createElement("div");
  gridNode.setAttribute("class", "grid-item");
  gridNode.innerHTML = `<div class="item-container"> <div>X</div></div>`;
  gridNode.addEventListener("click", () => flipCard(item));
  item.node = gridNode;
  gridsElm.appendChild(gridNode);
};
const flipCard = item => {
  if (item.isMatched || checking) {
    return;
  }
  item.node.classList.toggle("open");
  item.isOpen = !item.isOpen;
  item.node.innerHTML = item.isOpen
    ? `<div class="item-container"> <div>${item.name}</div></div>`
    : `<div class="item-container"> <div>X</div></div>`;
  if (!checkMatching) {
    matchedItem = item;
    checkMatching = true;
  } else {
    numFlips++;
    if (item.name == matchedItem.name) {
      // matched
      item.isMatched = true;
      matchedItem.isMatched = true;
      checkMatching = false;
      gameDone();
    } else {
      // ummatched
      checking = true;
      checkMatching = false;
      setTimeout(() => {
        item.node.innerHTML = `<div class="item-container"> <div>X</div></div>`;
        matchedItem.node.innerHTML = `<div class="item-container"> <div>X</div></div>`;
        item.isOpen = false;
        item.node.classList.remove("open");
        matchedItem.isOpen = false;
        matchedItem.node.classList.remove("open");
        checking = false;
      }, 1000);
    }
  }
};

const gameDone = () => {
  for (i = 0; i < gridItems.length; i++) {
    console.log(gridItems[i].isMatched, gridItems[i].isOpen);
    if (!gridItems[i].isMatched || !gridItems[i].isOpen) {
      return;
    }
  }
  isDone = true;
  setTimeout(() => {
    alert("Congrats. You have won in " + numFlips + " flips.");
    gameGridElm.style.display = "none";
    selecrDifficultyElm.style.display = "block";
  }, 1000);
};
