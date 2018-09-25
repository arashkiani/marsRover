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
		frameware.worldSize = '10 10'
		frameware.takeInCoordinates = '0 0 N'
		frameware.takeInCommands = 'F'
		expect(frameware.output).toBe('1 0 N')
	})

	test('Rover can Get Lost', () => {
		frameware.worldSize = '0 0'
		frameware.takeInCoordinates = '0 0 N'
		frameware.takeInCommands = 'F'
		expect(frameware.output).toBe('0 0 N LOST')
	})

	test('Rover leave Sent when it Get Lost', () => {
		frameware.worldSize = '0 0'
		frameware.takeInCoordinates = '0 0 N'
		frameware.takeInCommands = 'F'
		expect(frameware.scent).toHaveLength(1)
	})

	test('Rover use Sent to avoid danger', () => {
		frameware.worldSize = '1 0'

		frameware.takeInCoordinates = '0 0 N'
		frameware.takeInCommands = 'FF'

		frameware.takeInCoordinates = '0 0 N'
		frameware.takeInCommands = 'FF'

		expect(frameware.scent).toHaveLength(1)
		expect(frameware.output).toBe('1 0 N')
	})
})
