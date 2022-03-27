window.onload = init;

// VIEW ////////////////////////////////////////////////
const view = {
	displayMessage: function(msg) {
		const messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
		const cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        const cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};
view.displayMessage("Volkova's Battleship Game");

// MODEL ///////////////////////////////////////////////
let model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    ships: [],

    fire: function(guess) {
		for (let i = 0; i < this.numShips; i++) {
			let ship = this.ships[i];
			let index = ship.locations.indexOf(guess);

			if (ship.hits[index] == "hit") {
				view.displayMessage("Oops, you already hit that ship captain!");
				return true;

			} else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
					view.displayMessage("NOO you sank my PRECIOUS battleship!!!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed buddy.");

		return false;
	},

    isSunk: function(ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },

    generateShip: function() {
        const direction = generateRandomNumber(2);
        let row, col;
		const horizontal = 1;
		const locationScope = this.boardSize - this.shipLength + 1

        if (direction === horizontal) { 
            row = generateRandomNumber(this.boardSize);
            col = generateRandomNumber(locationScope);
        } else {             
            row = generateRandomNumber(locationScope);
            col = generateRandomNumber(this.boardSize);
        }

        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === horizontal) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },
    
    collision: function(locations) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },
	
	generateShipsStates: function() {
		for (let i = 0; i < this.numShips; i++) {
			this.ships.push({locations: this.createShipState(0), hits: this.createShipState("")});
		}
	},

	createShipState: function(state) {
		let array =[]; 
		for (let i = 0; i < this.shipLength; i++) {
			array.push(state);
		} 
		return array
	},
	
    generateShipLocations: function() {
		let locations;
		for (let i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));

			this.ships[i].locations = locations;
		}
		
	},
	generateBoard: function() {
		const table = document.createElement('table');
		document.getElementById('board').appendChild(table);

		for (let i = 0; i < this.boardSize; i++) {
			const row = document.createElement('tr');
			table.appendChild(row);
			
			for (let j = 0; j < this.boardSize; j++) {
				const cell = document.createElement('td');

				cell.setAttribute("id", ""+i+j+"");
				cell.setAttribute("onclick", "clickFire(this)");
				row.appendChild(cell);
			}	
		}
	},
	getAlphabet: function()  {
		alphabet= [];
		let letterA = 65;
		
		for (let i = 0; i < this.boardSize; i++) {			
			alphabet.push(String.fromCharCode(letterA+i));
		}
		return alphabet
	}
};

// CONTROLLER /////////////////////////////////////////////////
const controller = {
	guesses: 0,

	processGuess: function(guess) {
		if (isNaN(guess) || guess.length>2){
			guess = parseGuess(guess);
		}
		if (guess) {
			this.guesses++;
			let hit = model.fire(guess);
			if (hit && model.shipsSunk === model.numShips) {
					view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
					setTimeout(function(){ location.reload(); }, 2000);
			}
		}
	}
}


// HELPER FUNCTIONS /////////////////////////////////////////////
function generateRandomNumber(number) {
	return Math.floor(Math.random() * number)
}


	
function parseGuess(guess) {
	model.getAlphabet();
	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		let firstChar = guess.charAt(0);
		let row = alphabet.indexOf(firstChar);
		let column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}

function clickFire(cell) {
	controller.processGuess(cell.id);	
}

function handleFireButton() {
	let guessInput = document.getElementById("guessInput");
	let guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);
	guessInput.value = "";
}

function handleKeyPress(e) {
	let fireButton = document.getElementById("fireButton");
	
	e = e || window.event;

	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;
	
	model.generateShipsStates();
	model.generateShipLocations();
	model.generateBoard();
}

// GAME CHEATS
	// console.log("Ships array: ");
	// console.log(this.ships);




