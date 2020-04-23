let playerNames = ["Milos", "Martin"];

let currStep = 0;
resetForm();
showStep(currStep);
let currPlayer = 0;

// BOARD LOGIC //

var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var colNum = 1;
var alCnt = 0;
var numWritten = false;

var alWrite = 0;
var colWrite = 1;
let board = document.getElementById("boardOne");
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
				board.appendChild(square);
				if (alCnt == 10) alCnt = 0;
			} else {
				if (!numWritten) {
					// A number should be written instead of the cell
					let square = document.createElement("div");
					square.innerHTML = colNum++;
					square.classList.add("number");
					square.classList.add("unselectable");

					board.appendChild(square);
					numWritten = true;
					if (colNum == 11) colNum = 1;
				} else {
					let square = document.createElement("div");
					square.classList.add("boardCell");
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

function attachListeners() {
	cells = document.getElementsByClassName("cell");
	for (var i = 0; i < cells.length; i++)
		(function (i) {
			cells[i].onmousemove = function (e) {
				if (e.buttons == 1) {
					cells[i].style.backgroundColor = "green";
					console.log("User dragged over " + cells[i].id);
				}
			};
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

document.getElementById("boardNew").onmouseup = function (e) {
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
		document.getElementById("selCells").innerHTML =
			"SELECTED CELLS: " + selectedCells;
	} else {
		switch (selectedCells) {
			case 4:
				fourCell--;
				break;
			case 3:
				threeCell--;
				break;
			case 2:
				twoCell--;
				break;
			case 1:
				oneCell--;
				break;
		}

		let s = new Ship(selectedCells, currSelected);
		let player = players[0]; // TODO switch to current turn player
		player.addShip(s);
		s.printInfo();

		selectedCells = 0;
		document.getElementById("selCells").innerHTML =
			"SELECTED CELLS: " + selectedCells;
		markSelected(currSelected);
		printMatrix(matrix);
		currSelected.clear();
	}
};

/*
	A B C D
1	x x x x 
2	x x x x 
3	x x x x 

*/

let matrix = [];
for (var i = 0; i < 10; i++) {
	matrix[i] = [];
	for (var j = 0; j < 10; j++) {
		matrix[i][j] = 0;
	}
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
		row = el.charAt(1) - 1;
		console.log("Checking for " + row + "," + col);

		for (var i = row - 1; i < row + 2; i++) {
			if (i < 0) continue;
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
		let row = el.charAt(1) - 1;
		console.log("Marking " + row + "," + col);

		matrix[row][col] = 1;
	});
}

function clearSelection() {
	currSelected.forEach((el) => {
		let elem = document.getElementById("" + el);
		elem.classList.remove("selected");
		mySet.delete(el);
	});
	currSelected.clear();
}

class Ship {
	length;
	// Cells where the boat is not destroyed.
	// If its size == 0, the boat is destroyed
	alivePositions;

	constructor(length, positions) {
		this.length = length;
		this.alivePositions = new Set();

		positions.forEach((pos) => {
			this.alivePositions.add(pos);
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
let player = new Player("Milos");
players.push(player);
player = new Player("Martin");
players.push(player);
player = players[0];

// WELCOME PAGE //

function showStep(n) {
	var blck = document.getElementsByClassName("step");
	console.log(blck);
	blck[n].style.display = "block";
}

function nextStep(n) {
	var blck = document.getElementsByClassName("step");

	if (!validateForm()) return false;

	playerNames[currStep] = blck[currStep].value;
	currStep++;
	if (currStep < 2) blck[currStep - 1].style.display = "none";

	if (currStep >= blck.length) {
		alert("FORM DONE" + " " + playerNames[0] + " " + playerNames[1]);
		window.location.href = "battleship-setup.html";
	}
	showStep(currStep);
}

function validateForm() {
	var blck = document.getElementsByClassName("step");

	if (blck[currStep].value == "") {
		blck[currStep].className += " invalid";
		return false;
	}

	return true;
}

function resetForm() {
	playerNames = [];
	document.getElementById("nameForm").reset();
}

function saveName() {
	let name = document.getElementById("playerName").value;
	alert("HELLO " + name);
}

function setTitle() {
	let title = document.getElementById("title");
	title.innerHTML = "Trenutno bira: " + playerNames[currPlayer];
}
