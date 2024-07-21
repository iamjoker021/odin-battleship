const { Ship } = require('./ship-entity');

describe('ship', () => {
    it('is present', () => {
        expect(Ship).not.toBeUndefined();
        expect(Ship).not.toBeNull();
        expect(typeof Ship === 'function').toBe(true);
    })

    it('throw error for invalid argument', () => {
        expect(() => {Ship()}).toThrow('Valid length should be given');
        expect(() => {Ship('abc')}).toThrow('Valid length should be given');
        expect(() => {Ship(undefined)}).toThrow('Valid length should be given');
        expect(() => {Ship(null)}).toThrow('Valid length should be given');
        expect(() => {Ship('124')}).toThrow('Valid length should be given');
        expect(() => {Ship(2.555)}).toThrow('Valid length should be given');
        expect(() => {Ship(40**400)}).toThrow('Valid length should be given');
        expect(() => {Ship(10)}).toThrow('Valid length should be given');
        expect(() => {Ship(-3)}).toThrow('Valid length should be given');
    })

    const ship = Ship(3);

    it('has hit function', () => {
        expect(typeof ship.hit === 'function').not.toBeNull();
    }) 

    it('has isSunk function', () => {
        expect(typeof ship.isSunk === 'function').toBe(true);
    }) 

    it('sunk after hit more than its length', () => {
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    })
})