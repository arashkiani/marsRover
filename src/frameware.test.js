import Frameware from './frameware'

let frameware
describe('sanity check', () => {
	beforeEach(() => {
		frameware = new Frameware()
	})
	test('Default works', () => {
		expect(frameware.output).toBe('0 0 N')
	})

	test('Testing receive coordinates', () => {
		frameware.takeInCoordinates = '1 1 N'
		expect(frameware.output).toBe('1 1 N')
	})

	test('Testing receive commands', () => {
		frameware.takeInCommands = 'FF'
		expect(frameware.commands).toHaveLength(2)
	})
})
