let p1 = JSON.parse(localStorage.getItem("p1"));
let p2 = JSON.parse(localStorage.getItem("p2"));

if (!p1 || !p2) {
	window.location.href = "battleship-welcome.html";
}

let players = [p1, p2];

var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var colNum = 1;
var alCnt = 0;
var numWritten = false;

let turn = 0;

var alWrite = 0;
var colWrite = 1;
let board = document.getElementById("boardOne");
drawBoard(board);

colNum = 1;
alCnt = 0;
numWritten = false;

alWrite = 0;
colWrite = 1;
turn = 1;
board = document.getElementById("boardTwo");
drawBoard(board);

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

					square.id =
						"" +
						turn.toString() +
						alphabet[alWrite++].toString() +
						colWrite.toString();
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

updateTurn();

function updateTurn() {
	hideShips();
	let board;

	turn = (turn + 1) % 2;
	if (turn > 0) {
		board = document.getElementById("boardTwo");
		board.classList.add("unavailable");
		board = document.getElementById("boardOne");
		board.classList.remove("unavailable");
	} else {
		board = document.getElementById("boardOne");
		board.classList.add("unavailable");
		board = document.getElementById("boardTwo");
		board.classList.remove("unavailable");
	}

	let title = document.getElementById("currentPlayer");
	title.innerHTML = "On the move: " + players[turn].name;

	// showShips(); Required as part of the coursework
}

let usedCells = new Set();

function attachListeners() {
	cells = document.getElementsByClassName("cell");
	for (var i = 0; i < cells.length; i++)
		(function (i) {
			cells[i].onclick = function (e) {
				if (!usedCells.has(cells[i].id + "")) {
					if (tryHit(cells[i].id.substring(1))) {
						if (cells[i].classList.contains("selected")) {
							cells[i].classList.remove("selected");
						}
						cells[i].classList.add("destroyed");
						updateScore();
						checkWin();
					} else {
						cells[i].classList.add("missed");
						checkWin();
						updateTurn();
					}
				}
			};
		})(i);
}

function checkWin() {
	if (!p1.remainingShips || !p2.remainingShips) {
		let winScreen = document.getElementById("winScreen");
		let winner = p1.remainingShips == 0 ? p2.name : p1.name;

		document.getElementById("winner").innerHTML = winner.toUpperCase();
		document.getElementById("winnerScore").innerHTML = `Remaining ships: ${
			p1.remainingShips == 0 ? p2.remainingShips : p1.remainingShips
		}`;
		winScreen.style.display = "block";
	}
}

function tryHit(position) {
	// Check if it's a hit, update the fields if it is

	let opp = (turn + 1) % 2;
	usedCells.add(opp + position + "");

	for (var shipIndx = 0; shipIndx < players[opp].ships.length; shipIndx++) {
		for (
			var shipPosIndx = 0;
			shipPosIndx < players[opp].ships[shipIndx].alivePositions.length;
			shipPosIndx++
		) {
			let localPos = players[opp].ships[shipIndx].alivePositions[shipPosIndx];

			if (localPos == position) {
				// Hit!
				// Remove it from alive positions
				players[opp].ships[shipIndx].alivePositions.splice(
					players[opp].ships[shipIndx].alivePositions.indexOf(position),
					1
				);

				// Update remaining ships if an entire ship is sunk
				if (!players[opp].ships[shipIndx].alivePositions.length) {
					// Ship has been destroyed
					players[opp].remainingShips--;
					players[opp].ships.splice(shipIndx, 1);
				}
				return true;
			}
		}
	}
	return false;
}

function showShips() {
	players[turn].ships.forEach((ship) => {
		ship.alivePositions.forEach((pos) => {
			document.getElementById(turn + "" + pos).classList.add("selected");
		});
	});
}

function hideShips() {
	players[turn].ships.forEach((ship) => {
		ship.alivePositions.forEach((pos) => {
			let el = document.getElementById(turn + "" + pos);
			if (el.classList.contains("selected")) {
				el.classList.remove("selected");
			}
		});
	});
}

function updateScore() {
	// Update the view
	document.getElementById("p1Score").innerHTML =
		"Remaining ships: " + players[0].remainingShips;
	document.getElementById("p2Score").innerHTML =
		"Remaining ships: " + players[1].remainingShips;
}

function newGame() {
	window.location.href = "battleship-welcome.html";
}
