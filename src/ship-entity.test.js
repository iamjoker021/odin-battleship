const { Ship } = require('./ship-entity');

describe('ship', () => {
    it('is present', () => {
        expect(Ship).not.toBeUndefined();
        expect(Ship).not.toBeNull();
        expect(typeof Ship === 'function').toBe(true);
    })

    const ship = Ship(3);

    describe('is method exists', () => {
        it('has hit function', () => {
            expect(typeof ship.hit === 'function').not.toBeNull();
        }) 
    
        it('has isSunk function', () => {
            expect(typeof ship.isSunk === 'function').toBe(true);
        }) 
    
        it('has getLength function', () => {
            expect(typeof ship.getLength === 'function').toBe(true);
        })
    })
    
    describe('is method works', () => {
        it('check length is correct', () => {
            expect(ship.getLength()).toBe(3);
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

})