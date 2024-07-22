const { Player } = require('./player');

describe('Player', () => {
    it('is a function', () => {
        expect(typeof Player).toBe('function')
    })

    const player = Player('player1');

    describe('check if method/attribute is present', () => {
        it('test if player has getName', () => {
            expect(typeof player.getName).toBe('function');
        })

        it('test if player has getGameboard', () => {
            expect(typeof player.getGameboard).toBe('function');
        })
    })

    describe('test the method functionality', () => {
        it('test if player name is correct', () => {
            expect(player.getName()).toBe('player1');
        })
    })
    
})