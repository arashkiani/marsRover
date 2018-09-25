import RoverLauncher from './roverLauncher'
import Frameware from './frameware'

let roverLauncher
describe('Check against the data', () => {
	beforeEach(() => {
		roverLauncher = new RoverLauncher()
		roverLauncher.Driver = Frameware
		roverLauncher.worldSize = '5 3'
	})
	test('rover deployed @ 1 1 E Move => 1 1 E', () => {
		const output = roverLauncher.deploy('1 1 E', 'RFRFRFRF')
		expect(output).toBe('1 1 E')
	})
	test('rover deployed @ 3 2 N Move => 3 3 N LOST', () => {
		const output = roverLauncher.deploy('3 2 N', 'FRRFLLFFRRFLL')
		expect(roverLauncher.scent).toHaveLength(1)
		expect(output).toBe('3 3 N LOST')
	})
	test('rover deployed @ 0 3 W Move => LLFFFLFLFL', () => {
		roverLauncher.deploy('3 2 N', 'FRRFLLFFRRFLL')
		const output = roverLauncher.deploy('0 3 W', 'LLFFFLFLFL')
		expect(output).toBe('2 3 S')
	})

	test('rover deployed @ 0 1 N Move Forward and Back => FB', () => {
		const output = roverLauncher.deploy('0 1 N', 'FB')
		expect(output).toBe('0 1 N')
	})

	test('rover deployed @ 0 1 N can hold', () => {
		const output = roverLauncher.deploy('0 1 N', 'HHHHH')
		expect(output).toBe('0 1 N')
	})

	test('rover deployed @ 0 1 N can hold but not too much', () => {
		const commands = Array(101).join('H')
		expect(() => {
			roverLauncher.deploy('0 1 N', commands)
		}).toThrow()
	})
})
