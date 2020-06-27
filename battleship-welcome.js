localStorage.clear();
let players = [];

let turn = 0;

let form = document.getElementById("nameForm");

// Prevent form submission
form.addEventListener("submit", (e) => {
	e.preventDefault();
	nextStep();
});

showStep();

function showStep() {
	let form = document.getElementById("nameForm");
	form.reset();

	let input = document.getElementById("playerName");

	if (!turn) {
		input.placeholder = "Player one...";
	} else {
		input.placeholder = "Player two...";
		let btn = document.getElementById("nextStepBtn");
		btn.innerHTML = "START GAME";
		btn.classList.remove("blue");
		btn.classList.add("orange");
	}
}

function nextStep() {
	let input = document.getElementById("playerName");

	if (!validateForm()) return false;

	players.push(input.value);
	turn++;

	if (turn > 1) {
		localStorage.setItem("p1Name", players[0]);
		localStorage.setItem("p2Name", players[1]);
		window.location.href = "battleship-setup.html";
	}
	showStep(turn);
}

function validateForm() {
	let input = document.getElementById("playerName");
	let re = /\b[\w]+(?![^\w])\b/g;

	let regOK = input.value.match(re) == null ? false : true;

	if (
		input.value == "" ||
		input.value.length < 3 ||
		input.value.length > 15 ||
		!regOK
	) {
		input.className += " invalid";
		return false;
	} else {
		if (input.classList.contains("invalid")) {
			input.classList.remove("invalid");
		}
	}

	return true;
}

function resetForm() {
	playerNames = [];
	document.getElementById("nameForm").reset();
}
