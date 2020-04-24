localStorage.clear();
let players = [];

let turn = 0;
//resetForm();

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

	//console.log(input);

	if (!turn) {
		input.placeholder = "Prvi igrač...";
	} else {
		input.placeholder = "Drugi igrač...";
		let btn = document.getElementById("nextStepBtn");
		btn.innerHTML = "ZAPOČNI IGRU";
		btn.classList.remove("blue");
		btn.classList.add("orange");
	}
}

function nextStep() {
	let input = document.getElementById("playerName");

	if (!validateForm()) return false;

	//let player = new Player(input.value);
	players.push(input.value);
	turn++;

	if (turn > 1) {
		//alert("FORM DONE" + " " + playerNames[0] + " " + playerNames[1]);
		localStorage.setItem("p1Name", players[0]);
		console.log("added " + players[0]);
		localStorage.setItem("p2Name", players[1]);
		window.location.href = "battleship-setup.html";
	}
	showStep(turn);
}

function validateForm() {
	let input = document.getElementById("playerName");
	let re = /\b[\w]+(?![^\w])\b/g;

	let regOK = input.value.match(re) == null ? false : true;
	console.log(input.value.match(re));

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
	//localStorage.clear();
	playerNames = [];
	document.getElementById("nameForm").reset();
}

function saveName() {
	let name = document.getElementById("playerName").value;
	alert("HELLO " + name);
}
