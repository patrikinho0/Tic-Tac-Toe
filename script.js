document.addEventListener("DOMContentLoaded", function() {
    console.log("qwerty")

    let option = "O"
    let moves = 0
    let gameOver = false
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const turnDisplay = document.createElement('div')
    turnDisplay.classList.add('turn-display')
    document.querySelector('.container').appendChild(turnDisplay)

    const resetButton = document.getElementById("reseter")
    resetButton.addEventListener('click', () => location.reload())

    document.querySelectorAll(".boards button").forEach(button =>
        button.addEventListener("click", gierka)
    )

    let choiceX = document.getElementById("choiceX")
    choiceX.addEventListener("click", () => setStartSymbol("X"))

    let choiceO = document.getElementById("choiceO")
    choiceO.addEventListener("click", () => setStartSymbol("O"))


    function setStartSymbol(symbol) {
        option = symbol
        displayTurn()
    }

    function displayTurn() {
        turnDisplay.innerHTML = `Current Turn: ${option}`
    }

    function gierka() {
        if (this.innerHTML === "-" && !gameOver) {
            this.innerHTML = option
            moves++
            checkGameStatus()
            option = option === "X" ? "O" : "X"
            displayTurn()
        }
    }

    function checkGameStatus() {
        const values = Array.from(document.querySelectorAll(".boards button"), button => button.innerHTML);

        for (const combo of winningCombinations) {
            const [a, b, c] = combo
            if (values[a] !== "-" && values[a] === values[b] && values[b] === values[c]) {
                announceResult(values[a])
                turnDisplay.innerHTML = ""
                gameOver = true
                break
            }
        }

        if (!gameOver && moves === 9) {
            announceResult("draw")
        }
    }

    function announceResult(winner) {
        const resultDiv = document.querySelector(".result")
        resultDiv.innerHTML = winner === "draw" ? "It is a draw!" : `Player ${winner} wins!`
    }
})
