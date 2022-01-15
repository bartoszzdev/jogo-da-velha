const warning = document.querySelector(".warning")
const symbolsBtn = document.querySelectorAll(".btn")
const grid = document.querySelector(".grid")
let boxes
let chosenSymbol
let board = ['','','','','','','','','']
const winningSequences = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

createBoard()

function createBoard() {
    symbolsBtn.forEach((symbol) => {
        symbol.addEventListener('click', () => {
            chosenSymbol = symbol.value
            warning.style.display = 'none'
            grid.style.opacity = 1
            document.querySelector('.container').style.backgroundColor = '#fff'

            for (let i = 0; i <= 8; i++) {
                grid.innerHTML += `<div></div>`
                boxes = document.querySelectorAll(".grid div")
            }

            setupBoard()
        })
    })
}

function setupBoard() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', (e) => {
            e.target.textContent = chosenSymbol
            e.target.style.pointerEvents = 'none'
            board[i] = chosenSymbol

            let winningSequencesIndex = checkWinner(chosenSymbol)
            if (winningSequencesIndex >= 0) {
                gameIsOver(winningSequencesIndex)
            } else {
                chosenSymbol == 'X' ? chosenSymbol = 'O' : chosenSymbol = 'X'
            }
        })
    }
}

function checkWinner(symbol) {
    for (let i in winningSequences) {
        if (board[winningSequences[i][0]] == symbol &&
            board[winningSequences[i][1]] == symbol &&
            board[winningSequences[i][2]] == symbol) {
                return i
        }
    }
    return -1
}

function gameIsOver(sequenceWinner) {
    for (let i in winningSequences[sequenceWinner]) {
        boxes[winningSequences[sequenceWinner][i]].style.backgroundColor = '#498f1b'
    }

    grid.style.pointerEvents = 'none'

    setTimeout(() => {
        document.querySelector('.container').style.backgroundColor = 'rgba(0, 0, 0, 0.404)'
        warning.style.display = 'block'
        warning.innerHTML = `<h1 class="title">
                                Jogador <span style="font-size:2.5rem">${chosenSymbol}</span> venceu!!!
                            </h1>
                            <input type="button" value="Jogar novamente" class="btn" onclick="playAgain()">`
    }, 800)
}

function playAgain() {
    location.reload()
}