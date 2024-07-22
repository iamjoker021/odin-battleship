const { Gameboard } = require('./gameboard');

describe('GameBoard', () => {
    // Create 10x10 grid
    // Create list of Ships to be given to user
    // Place the Ship in given coordinate
    // Receive inputs to place all the ships
    // Mark Ship Hit and Miss
    // Give Status of Ship Sunk

    it('is present', () => {
        expect(Gameboard).not.toBeUndefined();
        expect(Gameboard).not.toBeNull();
        expect(typeof Gameboard === 'function').toBe(true);
    })

    describe('has required method', () => {
        const gameboard = Gameboard();

        it('has getGrid function', () => {
            expect(typeof gameboard.getGrid === 'function').toBe(true);
        })
    
        it('has receiveAttack function', () => {
            expect(typeof gameboard.receiveAttack === 'function').toBe(true);
        })
    
        it('has shipStatus function', () => {
            expect(typeof gameboard.getShipStatus === 'function').toBe(true);
        })
    })

    describe('check if method works', () => {
        const gameboard = Gameboard();

        describe('test the placeShip', () => {
            const expected = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]

            it('test if Grid is Empty', () => {
                expect(gameboard.getGrid()).toEqual(expected);
            })

            it('test if the Ship is being placed correctly', () => {
                gameboard.placeShip('carrier', 5, 0, 0);
                expected[0] = ['carrier', 'carrier', 'carrier', 'carrier', 'carrier', 0, 0, 0, 0, 0];
                expect(gameboard.getGrid()).toEqual(expected);
            })

            it('test if the Ship is not placed if Ship already exist in path', () => {
                gameboard.placeShip('cruiser', 3, 0, 0, true);
                expect(gameboard.getGrid()).toEqual(expected);
    
                gameboard.placeShip('cruiser', 3, 9, 9);
                expect(gameboard.getGrid()).toEqual(expected);
    
                gameboard.placeShip('cruiser', 3, 9, 9, true);
                expect(gameboard.getGrid()).toEqual(expected);
    
            })

            it('test if Ship is being placed vertically', () => {
                gameboard.placeShip('cruiser', 3, 1, 1, true);
                expected[1][1] = 'cruiser'; expected[2][1] = 'cruiser'; expected[3][1] = 'cruiser';
                expect(gameboard.getGrid()).toEqual(expected);
            })
        })

        describe('test receive Attack', () => {
            const expected = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]
            const gameboard = Gameboard();
            gameboard.placeShip('cruiser', 3, 1, 1, true);
            expected[1][1] = 'cruiser'; expected[2][1] = 'cruiser'; expected[3][1] = 'cruiser';

            it('test if recieveAttack mark Hit correctly', () => {
                gameboard.receiveAttack(7, 7);
                expected[7][7] = 'H';
                expect(gameboard.getGrid()).toEqual(expected);
            })

            it('test if recieveAttack reduce ship health on hit', () => {
                statusExpected = {
                    shipsAlive: 1,
                    shipSunkStatus: {
                        'cruiser': false
                    }
                }
                gameboard.receiveAttack(1, 1);
                expected[1][1] = 'H';
                expect(gameboard.getGrid()).toEqual(expected);
                expect(gameboard.getShipStatus()).toEqual(statusExpected);
                gameboard.receiveAttack(2, 1);
                gameboard.receiveAttack(3, 1);
                statusExpected['shipsAlive'] = 0;
                statusExpected['shipSunkStatus']['cruiser'] = true;
                expect(gameboard.getShipStatus()).toEqual(statusExpected);
            })
        })
    })

    
})