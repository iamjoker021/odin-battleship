const { Ship } = require("./ship-entity");

const Gameboard = () => {
    let _grid, _ships;
    const _GRIDSIZE=10;

    const getGrid = () => _grid;

    // Grid Status: 0 - Empty, H - Hit, shipName - Ship which is present
    const getShipStatus = () => {
        const shipStatus = {}
        let totalAlive = 0;
        for (const [key, ship] of Object.entries(_ships)) {
            shipStatus[key] = ship.isSunk();
            totalAlive += ship.isSunk() ? 0 : 1;
        }
        return {
            'shipsAlive': totalAlive,
            'shipSunkStatus': shipStatus,
        }
    }

    const placeShip = (shipName, shipLength, x, y, isVertical=false) => {
        const ship = Ship(shipLength);

        if (isVertical) [x, y] = [y, x];

        // Ship falls inside grid
        if ((x >= 0 && x + shipLength < _GRIDSIZE) && (y >= 0 && y < _GRIDSIZE)) {
            // and if no ship already present in the path
            if([...Array(shipLength).keys()].map((i) => isVertical ? _grid[x+i][y] === 0 : _grid[y][x+i] === 0).every((val) => val)) {

                // Place the Ship on Board
                [...Array(shipLength).keys()].forEach((i) => {
                    const [posx, posy] = isVertical ? [x+i, y] : [y, x+i]
                    _grid[posx][posy] = shipName
                })
                
                _ships[shipName] = ship;
                return ship;
            }
        }

        return false;
    }

    const receiveAttack = (x, y) => {
        if (_grid[x][y] === 'H') {
            return false;
        }
        else if (_grid[x][y] === 0) {
            _grid[x][y] = 'H';
            return true;
        }
        else {
            const ship = _ships[_grid[x][y]];
            ship.hit();
            _grid[x][y] = 'H';
        }
        return true;
    }

    const clearGameboard = () => {
        _grid = [...Array(_GRIDSIZE).keys()].map((k) => [...Array(_GRIDSIZE).keys()].map((k) => 0));
        _ships = {};
    }
    clearGameboard();

    return { getGrid, placeShip, receiveAttack, getShipStatus, clearGameboard }
}

module.exports = {
    Gameboard
}