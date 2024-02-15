const players_div = document.querySelector('.player-container');
const start_button = document.querySelector('#start-button');
const gamebox_div = document.querySelector('.gamebox');
let gamebox = Array(9);


console.log(gamebox);

function createPlayer(name, marker) {
    this.name = name;
    this.marker = marker;
    return { name, marker };
}

const player1 = createPlayer("Ujjan", "X");
const player2 = createPlayer("Saloni", "O");

function playboard(gamebox) {
    for (let i = 1; i <= gamebox.length; i++) {
        const newElement = document.createElement('div');
        newElement.id = i;
        newElement.classList.add('cell'); 
        gamebox_div.appendChild(newElement);
    }
}

function gameplay(player1, player2) {
    let currentPlayer = player1;
    let gameEnded = false; // Flag to track if game has ended
    let cell_div = document.querySelectorAll('.cell');

    cell_div.forEach(cell => {
        cell.addEventListener('click', () => {
            if (!gameEnded && !cell.textContent) { // Check if game has not ended and cell is not already marked
                cell.textContent = currentPlayer.marker;
                cell.style.fontSize = '24px'; 
                cell.style.color = currentPlayer.marker === "X" ? "blue" : "red";
                currentPlayer = (currentPlayer === player1) ? player2 : player1;
                gameEnded = gameconditions(); // Check win conditions after each move and update gameEnded flag
            } else if (gameEnded) {
                console.log('Game already ended'); // Print message if game has already ended
            } else {
                console.log('Cell already marked');
            }
        });
    });
}

function gameconditions() {
    let win_combination = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    let markXid = [];
    let markYid = [];
    let cell_div = document.querySelectorAll('.cell');

    cell_div.forEach(cell => {
        if (cell.textContent === "X") {
            markXid.push(parseInt(cell.id)); // Convert ID to integer and add to array
        } else if (cell.textContent === "O") {
            markYid.push(parseInt(cell.id)); // Convert ID to integer and add to array
        }
    });

    let xWins = false;
    let yWins = false;

    for (let i = 0; i < win_combination.length; i++) {
        let win = win_combination[i];
        if (win.every(cell => markXid.includes(cell))) {
            xWins = true;
            console.log(`${player1.name} wins`); 
            break; // Exit loop if player 1 wins
        } else if (win.every(cell => markYid.includes(cell))) {
            yWins = true;
            console.log(`${player2.name} wins`); // Correctly access player2's name
            break; // Exit loop if player 2 wins
        }
    }

    if (xWins || yWins) {
        console.log('Game Over');
        return true; // Return true if game is over
    } else {
        console.log('draw');
        return false; // Return false if game is not over
    }
}


playboard(gamebox);
gameplay(player1, player2);
