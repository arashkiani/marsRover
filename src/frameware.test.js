import Frameware from './frameware'

let frameware
describe('sanity check', () => {
	beforeEach(() => {
		frameware = new Frameware()
	})
	test('Default works', () => {
		expect(frameware.output).toBe('0 0 N')
	})

	test('receive coordinates', () => {
		frameware.takeInCoordinates = '1 1 N'
		expect(frameware.output).toBe('1 1 N')
	})

	test('receive commands', () => {
		frameware.takeInCommands = 'FF'
		expect(frameware.commands).toHaveLength(2)
	})

	test('Rover can Move', () => {
		frameware.takeInCommands = 'FF'
		expect(frameware.output).toBe('2 0 N')
	})
})
