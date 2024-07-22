const { Gameboard } = require('./gameboard');

const Player = (name) => {
    let _name = name;
    const _gameboard = Gameboard();

    const getName = () => _name;
    const getGameboard = () => _gameboard;

    return { getName, getGameboard }
}

module.exports = {
    Player
}