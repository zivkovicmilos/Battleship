let playerNames = [];

//let currStep = 0;
var rows = 10;
var cols = 10;
var squareSize = 50;
//resetForm();
//showStep(currStep);
var gameBoardContainer = document.getElementById("board");

for (i = 0; i < cols; i++) {
	for (j = 0; j < rows; j++) {
		var square = document.createElement("div");
		gameBoardContainer.appendChild(square);

		square.id = "s" + j + i;

		var topPosition = j * squareSize;
		var leftPosition = i * squareSize;

		square.style.top = topPosition + "px";
		square.style.left = leftPosition + "px";
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
