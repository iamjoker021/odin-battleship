const Ship = (length) => {
    const _length = length;
    let _hit=0;

    const getLength = () => _length;
    const hit = () => _hit++;
    const isSunk = () => _hit >= _length;

    return { getLength, hit, isSunk }
}

module.exports = {
    Ship
}