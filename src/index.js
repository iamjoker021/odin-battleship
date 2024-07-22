import './style.css';
const { Player } = require('./player');

const DOMHandler = () => {
    const players = []

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

    const playGround = () => {

    }

    homePage();

    document.querySelector('form.start-game').addEventListener('submit', (e) => {
        e.preventDefault();
        const playerName = e.target.querySelector('input[name="player"]').value;
        players[0] = Player(playerName);
        players[1] = Player('Computer');
    })

}

DOMHandler();