type ActionType = { coordinates: string, commands: string }

export default class RoverLanucher {
	Frameware = false
	worldSize = '0 0'
	scent: Array<string> = []
	deploy(coordinates, commands) {
		if (!this.Frameware) {
			throw new Error('This Rover is not bootable please install driver')
		}
		if (commands.length >= 100) {
			throw new Error('This Rover cannot receive more than 100 commands')
		}
		if (this.worldSize === '0 0') {
			throw new Error('we cant launch rover, please set world size')
		}
		const rover = new this.Frameware()
		// this way we can update Frameware without loosing Scent
		rover.scent = this.scent
		rover.takeInCoordinates = coordinates
		rover.worldSize = this.worldSize
		rover.takeInCommands = commands
		this.scent = rover.scent
		return rover.output
	}
}
