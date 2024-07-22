import './style.css';
const { Player } = require('./player');

const DOMHandler = () => {
    const players = []

    const clearPlayground = () => {
        const playground = document.querySelector('section.playground');
        while (playground.firstChild) {
            playground.removeChild(playground.firstChild);
        }
    }

    const homePage = () => {
        const container = document.querySelector('section.playground');
        
        const form = document.createElement('form');
        form.classList.add('start-game');
        container.appendChild(form);

        const inpLabel = document.createElement('label');
        inpLabel.htmlFor = 'player';
        form.appendChild(inpLabel);

        const input = document.createElement('input');
        input.type='text'; input.name='player'; input.id='player'; input.placeholder='Player Name'; input.required=true;
        form.appendChild(input);

        const button = document.createElement('button');
        button.type='submit'; button.textContent='Start Game!'
        form.appendChild(button);
    }

    const getGridDisplay = (player) => {
        const gameboard = document.createElement('div');
        gameboard.classList.add('gameboard');

        const playerName = document.createElement('h3');
        playerName.textContent = player.getName();
        gameboard.appendChild(playerName);

        const buttonGrid = document.createElement('div');
        buttonGrid.classList.add('buttons');
        gameboard.appendChild(buttonGrid);

        player.getGameboard().getGrid().forEach((row, i) => {
            row.forEach((val, j) => {
                const button = document.createElement('button');
                button.type='button';
                if (val === 0) {
                    button.textContent = 'X'
                }
                buttonGrid.appendChild(button);
            })
        })

        return gameboard;
    }

    const displayPlaygroud = (players) => {
        const container = document.querySelector('section.playground');
        for (const player of players) {
            container.appendChild(getGridDisplay(player));
        }
    }

    homePage();
// 
    document.querySelector('form.start-game').addEventListener('submit', (e) => {
        e.preventDefault();
        const playerName = e.target.querySelector('input[name="player"]').value;
        players[0] = Player(playerName);
        players[1] = Player('Computer');

        clearPlayground();
        displayPlaygroud(players);
    })

}

DOMHandler();