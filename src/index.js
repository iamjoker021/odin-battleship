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
                    button.textContent = '-';
                }
                else if (val === 'H') {
                    button.textContent = 'X';
                }
                else {
                    button.classList.add('ship');
                    button.textContent = '-';
                }
                buttonGrid.appendChild(button);
            })
        })

        return gameboard;
    }

    const getShipForm = () => {
        const SHIPS = {
            'carrier': {length: 5, count: 1},
            'battleship': {length: 4, count: 2},
            'destoyer': {length: 3, count: 3},
            'submarine': {length:3, count: 4},
            // 'patrol': {length: 2, count: 5}
        }

        const form = document.createElement('form');
        form.classList.add('ship-form');

        const formName = document.createElement('h2');
        formName.textContent = 'Ship Details'
        form.appendChild(formName);

        for (const shipName in SHIPS) {
            const ship = SHIPS[shipName];

            const fieldset = document.createElement('fieldset');
            fieldset.classList.add('ship-details');
            form.appendChild(fieldset);

            const legend = document.createElement('legend');
            legend.textContent = `${shipName} - Length: ${ship.length}`;
            fieldset.appendChild(legend);

            [...Array(ship.count).keys()].forEach((index) => {
                const inpContainer = document.createElement('label');
                fieldset.appendChild(inpContainer);

                const label = document.createElement('label');
                label.textContent = `Pos ${index}`;
                inpContainer.appendChild(label);

                const inputX = document.createElement('input');
                inputX.type='number'; inputX.placeholder='x'; inputX.min=0; inputX.max=9; inputX.required=true;
                inputX.name=`${shipName}-${index}-x`;
                inputX.id=`${shipName}-${index}-x`;
                inpContainer.appendChild(inputX);

                const inputY = document.createElement('input');
                inputY.type='number'; inputY.placeholder='y'; inputY.min=0; inputY.max=9; inputY.required=true;
                inputY.name=`${shipName}-${index}-y`;
                inputY.id=`${shipName}-${index}-y`;
                inpContainer.appendChild(inputY);

                const ok = document.createElement('button');
                ok.textContent = 'OK';
                ok.type = 'button';
                inpContainer.appendChild(ok);
            })
        }

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        form.appendChild(submitButton);

        return form;
    }

    const diplayFormPage = (player) => {
        // Show the Grid and Player Name on left
        const playground = document.querySelector('section.playground');
        playground.appendChild(getGridDisplay(player));

        // Show the Form on right
        playground.appendChild(getShipForm())
    }

    const displayPlaygroud = (players) => {
        const container = document.querySelector('section.playground');
        for (const player of players) {
            container.appendChild(getGridDisplay(player));
        }
    }

    homePage();

    document.querySelector('form.start-game').addEventListener('submit', (e) => {
        e.preventDefault();
        const playerName = e.target.querySelector('input[name="player"]').value;
        players[0] = Player(playerName);
        players[1] = Player('Computer');

        clearPlayground();
        diplayFormPage(players[0]);
    })

}

DOMHandler();