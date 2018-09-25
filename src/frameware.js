/*
* controls : input(orientation, coordinate, commands), scent of other robots, lost flag
* interpreter to convert text to workable input types (Not needed)
* loop through commands and send them to __Move function__ or __orientate function__
* output getter to transfer result into rover launcher
*/

export default class frameware {
	orientation = 'N'
	coordinate = { x: 0, y: 0 }
	commands = []
	lost = false
	set takeInCoordinates(input) {
		const [x, y, orientation] = input.toUpperCase().split(' ')
		const coordinates = {
			x: parseInt(x, 10),
			y: parseInt(y, 10),
		}
		this.orientation = orientation
		this.coordinate = coordinates
	}
	set takeInCommands(commands) {
		// take in commands and make sure its not  more than 100
		this.commands = commands.slice(0, 99).split('')
		this.execute()
	}
	execute() {
		console.log('start calculations')
	}

	get output(): string {
		const { x, y } = this.coordinate
		return `${x} ${y} ${this.orientation}${this.lost ? ' LOST' : ''}`
	}
}
