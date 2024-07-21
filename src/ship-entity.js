const Ship = (length) => {
    if (!(typeof length === 'number' && 
        parseInt(length) === length && 
        length > 0 && length <= 5)) {
        throw new Error('Valid length should be given');
    }

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