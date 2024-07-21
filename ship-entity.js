const Ship = (life) => {
    if (!(typeof life === 'number' && 
        parseInt(life) === life && 
        life > 0 && life <= 5)) {
        throw new Error('Valid length should be given');
    }
    let _hit=0;

    const hit = () => _hit++;

    const isSunk = () => _hit >= life;

    return { hit, isSunk }
}

module.exports = {
    Ship
}