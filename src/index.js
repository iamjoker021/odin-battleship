import './style.css';
const { Player } = require('./player');

const DOMHandler = () => {
    const SHIPS = {
        'carrier': {length: 5, count: 1},
        'battleship': {length: 4, count: 2},
        'destoyer': {length: 3, count: 3},
        'submarine': {length:3, count: 4},
        // 'patrol': {length: 2, count: 5}
    }
    const players = []
    let playerTurn = 0;

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

    const getGridDisplay = (player, isReal, isActive) => {
        const gameboard = document.createElement('div');
        gameboard.classList.add('gameboard');
        gameboard.classList.add(isReal ? 'player' : 'computer');

        const playerName = document.createElement('h3');
        playerName.textContent = `${player.getName()} | ShipsAlive: ${player.getGameboard().getShipStatus()['shipsAlive']}` ;
        gameboard.appendChild(playerName);

        const buttonGrid = document.createElement('div');
        buttonGrid.classList.add('buttons');
        gameboard.appendChild(buttonGrid);

        player.getGameboard().getGrid().forEach((row, i) => {
            row.forEach((val, j) => {
                const button = document.createElement('button');
                button.type='button';
                button.dataset.x = j;
                button.dataset.y = i;
                if (isActive) {
                    button.disabled = false;
                } 
                else {
                    button.disabled = true;
                }

                if (val === 0) {
                    button.textContent = '-';
                }
                else if (val === 'M') {
                    button.textContent = 'X';
                    button.disabled = true;
                }
                else if (val === 'H') {
                    button.textContent = 'X';
                    button.classList.add('ship');
                    button.classList.add('hit');
                    button.disabled = true;
                }
                else {
                    if (isReal) {
                        button.classList.add('ship');
                    }
                    button.textContent = '-';
                }
                buttonGrid.appendChild(button);
                button.addEventListener('click', playRound);
            })
        })

        return gameboard;
    }

    const getShipForm = () => {

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

            for (let index=0; index<ship.count; index++){
                const inpContainer = document.createElement('div');
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
            }
        }

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        form.appendChild(submitButton);

        return form;
    }

    const placeShipOnGridRandom = (player) => {
        const gameboard = player.getGameboard();
        for (const shipType in SHIPS) {
            const ship = SHIPS[shipType];
            for(let index=0; index<ship.count; index++) {
                const shipName = `${shipType}-${index}`;
                let x, y, isVertical;
                do {
                    x= Math.round(Math.random() * 9);
                    y=Math.round(Math.random() * 9);
                    isVertical = Math.random() >= 0.5;
                }
                while (!gameboard.placeShip(shipName, ship.length, x, y, isVertical))
            }
        }
    }

    const diplayFormPage = (player) => {
        // Show the Grid and Player Name on left
        const playground = document.querySelector('section.playground');
        playground.appendChild(getGridDisplay(player));

        // Show the Form on right
        playground.appendChild(getShipForm())
    }

    const gameOver = () => {
        let playerLost;
        for (const player of players) {
            if(player.getGameboard().getShipStatus().shipsAlive === 0) {
                playerLost = player;
            };
        }
        if (!playerLost) {
            return false;
        }
        const playerWon = playerLost === players[0] ? players[1] : players[0]
        clearPlayground();
        const container = document.querySelector('section.playground');
        container.appendChild(getGridDisplay(players[0], true, false));
        container.appendChild(getGridDisplay(players[1], false, false));

        const body = document.querySelector('body');

        const h1 = document.createElement('h1');
        h1.textContent = `GameOver! ${playerWon.getName()} Wins`;
        body.appendChild(h1);
        return true;
    }

    const displayPlaygroud = () => {
        clearPlayground();
        const container = document.querySelector('section.playground');
        playerTurn = playerTurn === 1 ? 0 : 1;
        container.appendChild(getGridDisplay(players[0], true, playerTurn===0));
        container.appendChild(getGridDisplay(players[1], false, playerTurn));
    }

    const playRound = (e) => {
        e.preventDefault();
        console.log('Playe Round triggered')

        // Human Play
        if (!gameOver()) {
            players[1].getGameboard().receiveAttack(e.target.dataset.y, e.target.dataset.x);
            displayPlaygroud();
        }

        // Computer Play
        if (!gameOver()) {
            while (!players[0].getGameboard()
                .receiveAttack(Math.round(Math.random() * 9), Math.round(Math.random() * 9))
            ) ;
            displayPlaygroud();
        };
    }

    homePage();

    document.querySelector('form.start-game').addEventListener('submit', (e) => {
        e.preventDefault();
        const playerName = e.target.querySelector('input[name="player"]').value;
        players[0] = Player(playerName);
        players[1] = Player('Computer');

        placeShipOnGridRandom(players[0]);
        placeShipOnGridRandom(players[1]);

        displayPlaygroud();
    })

}

DOMHandler();