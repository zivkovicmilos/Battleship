let playerNames = ["Milos", "Martin"];

//let currStep = 0;
var rows = 10;
var cols = 10;
var squareSize = 50;
//resetForm();
//showStep(currStep);
let board = document.getElementById("boardOne");
let cnt = 1;
let currPlayer = 0;

for (i = 0; i < rows; i++) {
	for (j = 0; j < cols; j++) {
		let square = document.createElement("div");
		board.appendChild(square);

		square.id = "s" + i + j;

		square.tabIndex = cnt++;
		/*
		square.onclick = function (square) {
			alert("You clicked the " + square.target.id + " square!");
		};
		*/
	}
}

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
