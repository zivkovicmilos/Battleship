let p1Name = localStorage.getItem("p1Name");
let p2Name = localStorage.getItem("p2Name");

class Ship {
	length;
	// Cells where the boat is not destroyed.
	// If its size == 0, the boat is destroyed
	alivePositions;

	constructor(length, positions) {
		this.length = length;
		this.alivePositions = new Array();

		positions.forEach((pos) => {
			this.alivePositions.push(pos);
		});
	}

	isHit(position) {
		return alivePositions.has(position);
	}

	markHit(position) {
		this.alivePositions.delete(position);
	}

	printInfo() {
		this.alivePositions.forEach((el) => {
			console.log(el);
		});
	}
}

class Player {
	name;
	remainingShips;
	points; // Maybe useless
	ships;

	constructor(name) {
		this.name = name;
		this.remainingShips = 10;
		this.points = 0;
		this.ships = new Array();
	}

	getName() {
		return this.name;
	}

	getRemainingShips() {
		return this.remainingShips;
	}

	getPoints() {
		return this.points;
	}

	getShips() {
		return this.ships;
	}

	addShip(ship) {
		this.ships.push(ship);
	}

	tryHit(position) {
		// TODO update position as hit!
		return this.shipPositions.has(postion);
	}
}

let players = [];
initPlayers(p1Name, p2Name);

let turn = 0;

// BOARD LOGIC //

var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var colNum = 1;
var alCnt = 0;
var numWritten = false;

var alWrite = 0;
var colWrite = 1;
let board = document.getElementById("playerBoard");
drawBoard(board);
//board = document.getElementById("boardTwo");
//drawBoard(board);

function drawBoard(board) {
	for (i = 0; i < 10 + 1; i++) {
		for (j = 0; j < 10 + 1; j++) {
			if (!i && !j) {
				// Empty cell (0,0)
				let square = document.createElement("div");
				square.style.opacity = 0;
				board.appendChild(square);
			} else if (!i) {
				// Write a letter instead of a cell
				let square = document.createElement("div");
				square.innerHTML = alphabet[alCnt++];
				square.classList.add("letter");
				square.classList.add("unselectable");
				square.draggable = false;
				board.appendChild(square);
				if (alCnt == 10) alCnt = 0;
			} else {
				if (!numWritten) {
					// A number should be written instead of the cell
					let square = document.createElement("div");
					square.innerHTML = colNum++;
					square.classList.add("number");
					square.classList.add("unselectable");
					square.draggable = false;

					board.appendChild(square);
					numWritten = true;
					if (colNum == 11) colNum = 1;
				} else {
					let square = document.createElement("div");
					square.classList.add("boardCell");
					square.classList.add("unselectable");
					square.draggable = false;
					board.appendChild(square);

					square.id = "" + alphabet[alWrite++] + colWrite;
					if (alWrite == 10) {
						alWrite = 0;
						colWrite++;
					}
					square.classList.add("cell");
					if (j == 10) {
						numWritten = false;
					}
				}
			}
		}
	}
	attachListeners();
}

var selectedCells = 0;
let allSelected = new Set();
let currSelected = new Set();

function attachListeners() {
	cells = document.getElementsByClassName("cell");
	for (var i = 0; i < cells.length; i++)
		(function (i) {
			cells[i].onmousemove = function (e) {
				if (e.buttons == 1) {
					if (!allSelected.has(cells[i].id + "")) {
						allSelected.add(cells[i].id + "");
						currSelected.add(cells[i].id + "");
						selectedCells++;
					}
					cells[i].classList.add("selected");
					console.log("User dragged over " + cells[i].id);
				}
			};

			/*
			cells[i].oncontextmenu = function (e) {
				e.preventDefault();
				if (e.button == 2) {
					console.log("RIGHT CLICK");
					// Right mouse button, delete the ship if it exists
					if (allSelected.has(cells[i].id + "")) {
						// The cell was previously selected

						for (let i = 0; i < players[turn].ships.length; i++) {
							if (
								players[turn].ships[i].alivePositions.includes(cells[i].id + "")
							) {
								let posToDelete = players[turn].ships[i].alivePositions;
								pos.posToDelete.forEach((pos) => {
									allSelected.delete(pos);
								});
								players[turn].ships.splice(i, 1); // Remove the ship
								break;
							}
						}
					}
				}
			};
			*/
		})(i);
}

/*
4 - 1 cells
3 - 2 cells
2 - 3 cells
1 - 4 cells

*/

let fourCell = 1;
let threeCell = 2;
let twoCell = 3;
let oneCell = 4;

document.getElementById("playerBoard").onmouseup = function (e) {
	if (
		selectedCells > 4 ||
		selectedCells < 1 ||
		(selectedCells == 4 && !fourCell) ||
		(selectedCells == 3 && !threeCell) ||
		(selectedCells == 2 && !twoCell) ||
		(selectedCells == 1 && !oneCell) ||
		!canPlace(currSelected)
	) {
		console.log("Bad select");
		clearSelection();
		selectedCells = 0;
	} else {
		switch (selectedCells) {
			case 4:
				fourCell--;
				document.getElementById("fourCell").innerHTML = fourCell;
				break;
			case 3:
				threeCell--;
				document.getElementById("threeCell").innerHTML = threeCell;
				break;
			case 2:
				twoCell--;
				document.getElementById("twoCell").innerHTML = twoCell;
				break;
			case 1:
				oneCell--;
				document.getElementById("oneCell").innerHTML = oneCell;
				break;
		}

		let s = new Ship(selectedCells, currSelected);
		let player = players[turn];
		player.addShip(s);
		s.printInfo();

		selectedCells = 0;
		markSelected(currSelected);
		printMatrix(matrix);
		currSelected.clear();

		// Check if it's the other player's turn
		if (!fourCell && !threeCell && !twoCell && !oneCell) {
			let button = document.getElementById("nextPlayerBtn");
			button.classList.remove("unavailable");

			if (!button.classList.contains("orange")) {
				button.classList.add("blue");
			}
		}
	}
};

let matrix = [];
for (var i = 0; i < 10; i++) {
	matrix[i] = [];
	for (var j = 0; j < 10; j++) {
		matrix[i][j] = 0;
	}
}

function nextPlayerSelect() {
	turn++;
	if (turn > 1) {
		//localStorage.setItem("players", JSON.stringify(players));
		localStorage.setItem("p1", JSON.stringify(players[0]));
		localStorage.setItem("p1Ships", JSON.stringify(players[0].getShips()));

		localStorage.setItem("p2", JSON.stringify(players[1]));
		localStorage.setItem("p2Ships", JSON.stringify(players[1].getShips()));

		window.location.href = "battleship-game.html";
	} else {
		reset();
		setTitle();
	}
}

function reset() {
	// Reset the selection matrix
	matrix = [];
	for (var i = 0; i < 10; i++) {
		matrix[i] = [];
		for (var j = 0; j < 10; j++) {
			matrix[i][j] = 0;
		}
	}

	// Reset the number of available ships
	fourCell = 1;
	document.getElementById("fourCell").innerHTML = fourCell;

	threeCell = 2;
	document.getElementById("threeCell").innerHTML = threeCell;

	twoCell = 3;
	document.getElementById("twoCell").innerHTML = twoCell;

	oneCell = 4;
	document.getElementById("oneCell").innerHTML = oneCell;

	// Reset the sets
	selectedCells = 0;

	allSelected.forEach((el) => {
		let cell = document.getElementById(el);
		cell.classList.remove("selected");
	});
	allSelected.clear();

	// Reset the button
	let button = document.getElementById("nextPlayerBtn");
	button.classList.add("orange");
	button.classList.add("unavailable");
	button.innerHTML = "ZAPOČNI IGRU";
}

function letterToNum(letter) {
	switch (letter) {
		case "A":
			return 0;
		case "B":
			return 1;
		case "C":
			return 2;
		case "D":
			return 3;
		case "E":
			return 4;
		case "F":
			return 5;
		case "G":
			return 6;
		case "H":
			return 7;
		case "I":
			return 8;
		case "J":
			return 9;
	}
}

function canPlace() {
	let col;
	let row;

	for (let el of currSelected) {
		col = letterToNum(el.charAt(0));
		row = el.substring(1) - 1;
		console.log("Checking for " + row + "," + col);

		for (var i = row - 1; i < row + 2; i++) {
			if (i < 0 || i > 9) continue;
			for (var j = col - 1; j < col + 2; j++) {
				if (j < 0 || (row == i && col == j) || j > 9) continue;
				console.log("MATRIX[" + i + "][" + j + "] IS " + matrix[i][j]);
				if (matrix[i][j]) {
					console.log("Returning...");
					return false;
				}
			}
		}
	}

	if (!inSameRow()) {
		if (!inSameCol()) return false;
	}

	return true;
}

function inSameRow() {
	let row = currSelected.values().next().value.substring(1);
	console.log("Checking if it's all good in row " + row);

	for (let el of currSelected) {
		if (el.substring(1) !== row) {
			console.log("Error: in same row! " + el.substring(1) + " " + row);
			return false;
		}
	}
	return true;
}

function inSameCol() {
	let col = -1;

	for (let el of currSelected) {
		if (col < 0) {
			col = el.charAt(0);
		} else if (el.charAt(0) != col) {
			console.log("Error: in same column! " + el.charAt(0) + " " + col);
			return false;
		}
	}
	return true;
}

function printMatrix(mat) {
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			console.log("matrix[" + i + "][" + j + "] = " + mat[i][j]);
		}
	}
}

function markSelected(selected) {
	selected.forEach((el) => {
		let col = letterToNum(el.charAt(0));
		let row = el.substring(1) - 1;
		console.log("Marking " + row + "," + col);

		matrix[row][col] = 1;
	});
}

function clearSelection() {
	currSelected.forEach((el) => {
		let elem = document.getElementById("" + el);
		elem.classList.remove("selected");
		allSelected.delete(el);
	});
	currSelected.clear();
}

function setTitle() {
	let title = document.getElementById("currentPlayer");
	title.innerHTML = "Trenutno bira: " + players[turn].name;
}

function initPlayers(p1Name, p2Name) {
	if (!p1Name || !p2Name) {
		// Nothing is saved in local storage, can't access setup
		window.location.href = "battleship-welcome.html";
	} else {
		let player = new Player(p1Name);
		players.push(player);
		player = new Player(p2Name);
		players.push(player);
	}
}
