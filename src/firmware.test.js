import Firmware from './firmware'

let firmware
describe('sanity check', () => {
	beforeEach(() => {
		firmware = new Firmware()
	})
	test('Default works', () => {
		expect(firmware.output).toBe('0 0 N')
	})

	test('receive coordinates', () => {
		firmware.takeInCoordinates = '1 1 N'
		expect(firmware.output).toBe('1 1 N')
	})

	test('receive commands', () => {
		firmware.takeInCommands = 'FF'
		expect(firmware.commands).toHaveLength(2)
	})

	test('Rover can Move', () => {
		firmware.worldSize = '10 10'
		firmware.takeInCoordinates = '0 0 N'
		firmware.takeInCommands = 'F'
		expect(firmware.output).toBe('0 1 N')
	})

	test('Rover can Get Lost', () => {
		firmware.worldSize = '0 0'
		firmware.takeInCoordinates = '0 0 N'
		firmware.takeInCommands = 'F'
		expect(firmware.output).toBe('0 0 N LOST')
	})

	test('Rover leave scent when it Get Lost', () => {
		firmware.worldSize = '0 0'
		firmware.takeInCoordinates = '0 0 N'
		firmware.takeInCommands = 'F'
		expect(firmware.scent).toHaveLength(1)
	})

	test('Rover use scent to avoid danger', () => {
		firmware.worldSize = '1 0'

		firmware.takeInCoordinates = '0 0 S'
		firmware.takeInCommands = 'FF'

		firmware.takeInCoordinates = '0 0 S'
		firmware.takeInCommands = 'FF'
		expect(firmware.scent).toHaveLength(1)
		expect(firmware.output).toBe('0 0 S')
	})

	test('Change orientation to right', () => {
		firmware.worldSize = '0 0'
		firmware.takeInCoordinates = '0 0 N'
		firmware.takeInCommands = 'R'
		expect(firmware.output).toBe('0 0 E')
	})

	test('Change orientation to Left', () => {
		firmware.worldSize = '0 0'
		firmware.takeInCoordinates = '0 0 N'
		firmware.takeInCommands = 'L'
		expect(firmware.output).toBe('0 0 W')
	})

	test('Change orientation to Right & Move Forward', () => {
		firmware.worldSize = '1 1'
		firmware.takeInCoordinates = '0 0 N'
		firmware.takeInCommands = 'RF'
		expect(firmware.output).toBe('1 0 E')
	})

	test('Change orientation to Left & Move Forward', () => {
		firmware.worldSize = '1 1'
		firmware.takeInCoordinates = '0 0 N'
		firmware.takeInCommands = 'LF'
		expect(firmware.output).toBe('0 0 W LOST')
	})

	test('Change orientation to 2 x LEFT & Move Forward', () => {
		firmware.worldSize = '1 1'
		firmware.takeInCoordinates = '0 0 N'
		firmware.takeInCommands = 'LLF'
		expect(firmware.output).toBe('0 0 S LOST')
	})

	test('Change orientation to 3 x RIGHT & Move Forward', () => {
		firmware.worldSize = '1 1'
		firmware.takeInCoordinates = '0 0 N'
		firmware.takeInCommands = 'RRRF'
		expect(firmware.output).toBe('0 0 W LOST')
	})
})
