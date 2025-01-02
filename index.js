class RockPaperScissors {
    constructor() {
        this.choices = ['rock', 'paper', 'scissors'];
        this.emojis = {
            'rock': '✊',
            'paper': '✋',
            'scissors': '✌️'
        };
        this.scores = {
            player: 0,
            computer: 0,
            draws: 0,
            roundsToWin: 5
        };
        this.gameOver = false;

        
        this.winSound = new Audio('https://www.myinstants.com/media/sounds/street-fighter-ii-you-win-perfect.mp3');
        this.winSound.volume = 0.5;

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('.choice').forEach(button => {
            button.addEventListener('click', () => {
                if (!this.gameOver) {
                    button.classList.add('choice-animation');
                    setTimeout(() => button.classList.remove('choice-animation'), 300);
                    this.playRound(button.dataset.choice);
                }
            });
        });
    }

    getComputerChoice() {
        return this.choices[Math.floor(Math.random() * this.choices.length)];
    }

    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) return 'draw';
        
        const winConditions = {
            'rock': 'scissors',
            'paper': 'rock',
            'scissors': 'paper'
        };

        return winConditions[playerChoice] === computerChoice ? 'win' : 'lose';
    }

    updateScore(result) {
        if (this.gameOver) return;
        
        if (result === 'win') {
            this.scores.player++;
        } else if (result === 'lose') {
            this.scores.computer++;
        } else {
            this.scores.draws++;
        }
        
        document.querySelector('#player-score').textContent = this.scores.player;
        document.querySelector('#computer-score').textContent = this.scores.computer;
        document.querySelector('#draws').textContent = this.scores.draws;

        if (this.scores.player >= this.scores.roundsToWin || 
            this.scores.computer >= this.scores.roundsToWin) {
            this.endGame();
        }
    }

    updateDisplay(playerChoice, computerChoice, result) {
        const playerDisplay = document.querySelector('#player-choice');
        const computerDisplay = document.querySelector('#computer-choice');
        const message = document.querySelector('#message');

        playerDisplay.textContent = this.emojis[playerChoice];
        computerDisplay.textContent = this.emojis[computerChoice];

        const messages = {
            'win': '💫 Round Won! 💪',
            'lose': '💔 Round Lost! 💔',
            'draw': "🤝 It's a Draw! 🤝"
        };

        message.textContent = messages[result];

        if (result === 'win') {
            playerDisplay.classList.add('win-animation');
            setTimeout(() => playerDisplay.classList.remove('win-animation'), 500);
        } else if (result === 'lose') {
            computerDisplay.classList.add('win-animation');
            setTimeout(() => computerDisplay.classList.remove('win-animation'), 500);
        }
    }

    playRound(playerChoice) {
        const computerChoice = this.getComputerChoice();
        const result = this.determineWinner(playerChoice, computerChoice);
        
        this.updateDisplay(playerChoice, computerChoice, result);
        this.updateScore(result);
    }

    endGame() {
        this.gameOver = true;
        const playerWon = this.scores.player > this.scores.computer;
        
        if (playerWon) {
            this.winSound.play();
            this.showMessage('🏆 YOU WIN! 🏆');
        } else {
            this.showMessage('😔 YOU LOSE! 😔');
        }

        setTimeout(() => {
            const resetBtn = document.createElement('button');
            resetBtn.textContent = 'Play Again';
            resetBtn.classList.add('reset-button');
            resetBtn.onclick = () => this.resetGame();
            document.querySelector('#message').appendChild(resetBtn);
        }, 1500);
    }

    resetGame() {
        this.scores.player = 0;
        this.scores.computer = 0;
        this.scores.draws = 0;
        this.gameOver = false;
        document.querySelector('#player-score').textContent = '0';
        document.querySelector('#computer-score').textContent = '0';
        document.querySelector('#draws').textContent = '0';
        document.querySelector('#message').textContent = 'Choose your weapon!';
        document.querySelector('#player-choice').textContent = '❔';
        document.querySelector('#computer-choice').textContent = '❔';
    }

    showMessage(text) {
        const messageEl = document.querySelector('#message');
        messageEl.textContent = text;
    }
}

// Start the game
const game = new RockPaperScissors();